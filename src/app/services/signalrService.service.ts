import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private isConnected = false;
  private baseURL = 'http://localhost:5086'; // Replace with your API URL
  private hubUrl = 'https://babylai.net'; // Replace with your SignalR hub URL

  async startConnection(
    sessionId: string,
    apiKey: string,
    onMessageReceived: (
      message: string,
      senderType: string,
      needsAgent: boolean
    ) => void
  ): Promise<void> {
    console.log('sessionId:', sessionId);

    if (this.isConnected) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${this.hubUrl}/clientHub?access_token=${encodeURIComponent(apiKey)}`,
        {
          withCredentials: true,
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.LongPolling,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'X-Requested-With': 'XMLHttpRequest',
            'X-SignalR-User-Agent':
              'Microsoft SignalR/8.0 (8.0.7; Unknown OS; Browser; Unknown Runtime Version)',
          },
          skipNegotiation: false,
          accessTokenFactory: () => apiKey,
        }
      )
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on(
      'ReceiveMessage',
      (message: string, senderType: string, needsAgent: boolean) => {
        console.log(
          'Received message from SignalR:',
          message,
          senderType,
          needsAgent
        );
        onMessageReceived(message, senderType, needsAgent);
      }
    );

    try {
      await this.connection.start();
      console.log('SignalR connection started successfully.');

      this.isConnected = true;
      await this.joinGroup(sessionId);
      console.log('SignalR group joined.');
    } catch (error) {
      console.error('Error connecting to SignalR', error);
      this.isConnected = false;
    }
  }

  async joinGroup(sessionId: string): Promise<void> {
    if (this.connection) {
      try {
        console.log(`Attempting to join group with session ID: ${sessionId}`);
        await this.connection.invoke('JoinGroup', sessionId);
        console.log(`Joined group with session ID: ${sessionId}`);
      } catch (error) {
        console.error('Error joining SignalR group:', error);
      }
    }
  }

  async leaveGroup(sessionId: string): Promise<void> {
    if (this.connection && this.isConnected) {
      try {
        await this.connection.invoke('LeaveGroup', sessionId);
        console.log(`Left group with session ID: ${sessionId}`);
      } catch (error) {
        console.error('Error leaving SignalR group:', error);
      }
    }
  }

  async stopConnection(): Promise<void> {
    if (this.connection && this.isConnected) {
      await this.connection.stop();
      this.isConnected = false;
      console.log('SignalR disconnected.');
    }
  }
}
