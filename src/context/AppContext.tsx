import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, Currency, translations, Translations } from '../data/translations';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export type TextSize = 'normal' | 'large' | 'larger';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('cs_academy_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    } catch (e) {
      // ignore
    }
    return 'light';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const savedCurr = localStorage.getItem('cs_academy_currency');
      if (savedCurr === 'TSH' || savedCurr === 'KES' || savedCurr === 'USD') return savedCurr;
    } catch (e) {
      // ignore
    }
    return 'TSH';
  });

  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    try {
      const savedSize = localStorage.getItem('cs_academy_text_size');
      if (savedSize === 'large' || savedSize === 'larger') return savedSize;
    } catch (e) {
      // ignore
    }
    return 'normal';
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.add('notranslate');
      if (theme === 'dark') {
        root.classList.remove('light');
        root.classList.add('dark');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      const surface = theme === 'dark' ? '#090909' : '#ffffff';
      root.style.backgroundColor = surface;
      document.body.style.backgroundColor = surface;
      localStorage.setItem('cs_academy_theme', theme);
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        themeColor.setAttribute('content', theme === 'dark' ? '#090909' : '#ffffff');
      }
    } catch (e) {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('text-size-large', textSize === 'large');
    root.classList.toggle('text-size-larger', textSize === 'larger');
    try {
      localStorage.setItem('cs_academy_text_size', textSize);
    } catch (e) {
      // Keep the in-session control working when storage is unavailable.
    }
  }, [textSize]);

  const setTheme = (nextTheme: Theme) => {
    try {
      const root = document.documentElement;
      root.classList.add('theme-switching');
      root.classList.toggle('light', nextTheme === 'light');
      root.classList.toggle('dark', nextTheme === 'dark');
      const surface = nextTheme === 'dark' ? '#090909' : '#ffffff';
      root.style.backgroundColor = surface;
      document.body.style.backgroundColor = surface;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => root.classList.remove('theme-switching'));
      });
    } catch {
      // Keep theme changes working in non-browser rendering environments.
    }
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('cs_academy_currency', c);
    } catch (e) {
      // ignore
    }
  };

  const t = translations;

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        textSize,
        setTextSize: setTextSizeState,
        currency,
        setCurrency,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
