import * as Ably from 'ably';

export class ClientAblyService {
  private static client: Ably.Realtime | null = null;
  private static channel: Ably.RealtimeChannel | null = null;
  private static isConnected: boolean = false;
  private static sessionId: string | null = null;
  private static messageUnsubscribe: (() => void) | null = null;

  static async startConnection(
    sessionId: string,
    ablyToken: string,
    onMessageReceived: Function,
    tenantId: string
  ) {
    // Prevent multiple connections
    if (this.isConnected && this.sessionId === sessionId) {
      return;
    }

    // Close existing connection if connecting to a different session
    if (this.isConnected && this.sessionId !== sessionId) {
      await this.stopConnection();
    }

    try {
      // Initialize Ably client with the token
      this.client = new Ably.Realtime({
        authUrl: undefined,
        token: ablyToken,
        autoConnect: true,
      });

      // Wait for connection to be established
      await new Promise<void>((resolve, reject) => {
        if (!this.client) {
          reject(new Error('Failed to initialize Ably client'));
          return;
        }

        this.client.connection.once('connected', () => {
          this.isConnected = true;
          this.sessionId = sessionId;
          resolve();
        });

        this.client.connection.once('failed', (stateChange) => {
          console.error('Ably connection failed:', stateChange);
          reject(
            new Error(
              `Ably connection failed: ${
                stateChange.reason?.message || 'Unknown error'
              }`
            )
          );
        });

        this.client.connection.once('disconnected', (stateChange) => {
          console.error('Ably connection disconnected:', stateChange);
          reject(
            new Error(
              `Ably connection disconnected: ${
                stateChange.reason?.message || 'Unknown error'
              }`
            )
          );
        });

        // Set a timeout for connection
        setTimeout(() => {
          if (!this.isConnected) {
            reject(new Error('Ably connection timeout'));
          }
        }, 10000);
      });

      // Subscribe to the session room
      await this.joinChannel(sessionId, onMessageReceived, tenantId);
    } catch (error) {
      console.error('Error during Ably connection setup:', error);
      this.isConnected = false;
      this.sessionId = null;
      throw error;
    }
  }

  private static async joinChannel(
    sessionId: string,
    onMessageReceived: Function,
    tenantId: string
  ) {
    if (!this.client) {
      throw new Error('Chat client not initialized');
    }

    const roomName = `session:${tenantId}:${sessionId}`;

    // Set up raw channel subscription for server messages
    if (this.client) {
      this.channel = this.client.channels.get(roomName);

      // Subscribe to assistant/system responses
      this.channel.subscribe('ReceiveMessage', (message) => {
        try {
          const messageContent =
            typeof message.data === 'string'
              ? message.data
              : message.data?.content || message.data?.message;
          const senderType = message.data?.senderType || 3; // Assistant
          const needsAgent = message.data?.needsAgent || false;

          onMessageReceived(messageContent, senderType, needsAgent);
        } catch (error) {
          console.error('Error processing ReceiveMessage:', error);
        }
      });

      await this.channel.attach();
    }
  }

  static async stopConnection() {
    try {
      // Unsubscribe from room messages
      if (this.messageUnsubscribe) {
        this.messageUnsubscribe();
        this.messageUnsubscribe = null;
      }

      // Unsubscribe and detach from raw channel
      if (this.channel) {
        this.channel.unsubscribe();
        await this.channel.detach();
        this.channel = null;
      }

      // Close Ably connection
      if (this.client) {
        this.client.close();
        this.client = null;
      }

      this.isConnected = false;
      this.sessionId = null;
    } catch (error) {
      console.error('Error stopping Ably connection:', error);
      // Reset state even if there's an error
      this.isConnected = false;
      this.sessionId = null;
      this.client = null;
      this.channel = null;
      this.messageUnsubscribe = null;
    }
  }

  static isConnectionActive(): boolean {
    return this.isConnected && this.client?.connection.state === 'connected';
  }

  static getConnectionState(): string {
    return this.client?.connection.state || 'disconnected';
  }

  // Method to manually send a message (if needed for debugging or direct messaging)
  static async sendMessage(messageContent: string, senderType: number = 1) {
    if (!this.channel || !this.isConnected) {
      throw new Error('Connection not active');
    }

    try {
      const messageData = {
        text: messageContent,
        metadata: {
          senderType,
          sentAt: new Date().toISOString(),
        },
      };

      await this.channel.publish('message', messageData);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
