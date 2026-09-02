import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const themeKey = 'interview-prep-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(themeKey);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(themeKey, theme);
    window.dispatchEvent(new CustomEvent('interview-prep-theme-change', { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (nextTheme === 'light' || nextTheme === 'dark') setTheme(nextTheme);
    };
    window.addEventListener('interview-prep-theme-change', handleThemeChange);
    return () => window.removeEventListener('interview-prep-theme-change', handleThemeChange);
  }, []);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${nextTheme} theme`}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
