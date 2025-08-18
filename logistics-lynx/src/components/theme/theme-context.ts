/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  isDark: false,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
