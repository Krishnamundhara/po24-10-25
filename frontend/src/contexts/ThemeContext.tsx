import React, { createContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

const DEFAULT_THEME: ThemeColors = {
  primary: '#8B00FF',
  secondary: '#00CED1',
  accent: '#ff6a82',
};

interface ThemeContextType {
  theme: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
  resetTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeColors>(DEFAULT_THEME);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      try {
        setThemeState(JSON.parse(savedTheme));
        applyTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error('Error loading theme:', e);
      }
    } else {
      applyTheme(DEFAULT_THEME);
    }
  }, []);

  const applyTheme = (colors: ThemeColors) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
  };

  const setTheme = (colors: ThemeColors) => {
    setThemeState(colors);
    localStorage.setItem('appTheme', JSON.stringify(colors));
    applyTheme(colors);
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
