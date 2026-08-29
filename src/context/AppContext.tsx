import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, Currency, translations, Translations } from '../data/translations';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.lang = 'en';
      root.classList.add('notranslate');
      if (theme === 'dark') {
        root.classList.remove('light');
      } else {
        root.classList.add('light');
      }
      localStorage.setItem('cs_academy_theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
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
