import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private primaryColor: string = '#ad49e1';
  private logoUrl: string = '';
  private isDarkMode = signal(false);

  constructor() {
    this.initializeDarkModeDetection();
  }

  /**
   * Initialize dark mode detection based on browser preferences
   */
  private initializeDarkModeDetection(): void {
    // Check initial preference
    this.updateDarkModeState();

    // Listen for changes in color scheme preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Add listener for changes
      mediaQuery.addEventListener('change', () => {
        this.updateDarkModeState();
      });
    }
  }

  /**
   * Update dark mode state based on current browser preference
   */
  private updateDarkModeState(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(isDark);
    }
  }

  /**
   * Get current dark mode state
   */
  getDarkModeState() {
    return this.isDarkMode.asReadonly();
  }

  /**
   * Check if dark mode is currently active
   */
  isDarkModeActive(): boolean {
    return this.isDarkMode();
  }

  setPrimaryColor(color: string): void {
    this.primaryColor = color;
    this.updateCSSVariables();
  }

  setLogoUrl(url: string): void {
    this.logoUrl = url;
  }

  getPrimaryColor(): string {
    return this.primaryColor;
  }

  getLogoUrl(): string {
    return this.logoUrl;
  }

  private updateCSSVariables(): void {
    const root = document.documentElement;

    // Generate color variations based on the primary color
    const colorVariations = this.generateColorVariations(this.primaryColor);

    // Set CSS custom properties
    root.style.setProperty('--babylai-primary-color', this.primaryColor);
    root.style.setProperty('--babylai-primary-color-100', colorVariations[100]);
    root.style.setProperty('--babylai-primary-color-200', colorVariations[200]);
    root.style.setProperty('--babylai-primary-color-300', colorVariations[300]);
    root.style.setProperty('--babylai-primary-color-400', colorVariations[400]);
    root.style.setProperty('--babylai-primary-color-500', colorVariations[500]);
    root.style.setProperty('--babylai-primary-color-600', colorVariations[600]);
    root.style.setProperty('--babylai-primary-color-700', colorVariations[700]);
    root.style.setProperty('--babylai-primary-color-800', colorVariations[800]);
    root.style.setProperty('--babylai-primary-color-900', colorVariations[900]);
    root.style.setProperty('--babylai-primary-color-950', colorVariations[950]);
  }

  private generateColorVariations(baseColor: string): {
    [key: number]: string;
  } {
    // Generate variations by adjusting lightness
    const variations: { [key: number]: string } = {};

    variations[100] = this.lightenColor(baseColor, 0.85);
    variations[200] = this.lightenColor(baseColor, 0.65);
    variations[300] = this.lightenColor(baseColor, 0.45);
    variations[400] = this.lightenColor(baseColor, 0.25);
    variations[500] = baseColor; // Base color
    variations[600] = this.darkenColor(baseColor, 0.35);
    variations[700] = this.darkenColor(baseColor, 0.55);
    variations[800] = this.darkenColor(baseColor, 0.75);
    variations[900] = this.darkenColor(baseColor, 0.85);
    variations[950] = this.darkenColor(baseColor, 0.92);

    return variations;
  }

  /**
   * Lighten a color by a percentage
   */
  private lightenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Use HSL-like approach for more natural lightening
    const newR = Math.round(r + (255 - r) * amount);
    const newG = Math.round(g + (255 - g) * amount);
    const newB = Math.round(b + (255 - b) * amount);

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  /**
   * Darken a color by a percentage
   */
  private darkenColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Use HSL-like approach for more natural darkening
    const newR = Math.round(r * (1 - amount));
    const newG = Math.round(g * (1 - amount));
    const newB = Math.round(b * (1 - amount));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  initializeTheme(primaryColor: string, logoUrl: string): void {
    this.setPrimaryColor(primaryColor);
    this.setLogoUrl(logoUrl);
  }
}
