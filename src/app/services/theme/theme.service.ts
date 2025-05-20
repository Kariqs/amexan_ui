import { Injectable, signal } from '@angular/core';

type ThemePreference = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSignal = signal<boolean>(false);
  darkMode = this.darkModeSignal.asReadonly();

  constructor() {
    const savedPreference = localStorage.getItem(
      STORAGE_KEY
    ) as ThemePreference | null;

    if (savedPreference) {
      this.setDarkMode(savedPreference === 'dark');
    } else {
      // Use system preference if no saved preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.setDarkMode(prefersDark);
    }

    // Optional: Listen for system preference changes (if no user override)
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const hasSaved = localStorage.getItem(STORAGE_KEY);
        if (!hasSaved) {
          this.setDarkMode(e.matches);
        }
      });
  }

  toggleDarkMode() {
    const newValue = !this.darkMode();
    this.setDarkMode(newValue);
    localStorage.setItem(STORAGE_KEY, newValue ? 'dark' : 'light');
  }

  setDarkMode(value: boolean) {
    this.darkModeSignal.set(value);
    // Optional: set attribute on body/html
    document.documentElement.classList.toggle('dark', value);
  }

  resetPreference() {
    localStorage.removeItem(STORAGE_KEY);
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.setDarkMode(prefersDark);
  }
}
