import { Div, Dropdown } from '../components.ts';
import { ThemeColor, ThemeMode } from '../constants/theme.ts';
import translations from '../constants/language.ts';
import { getLanguage } from './language.ts';

import type { ThemeConfig, ThemeLabels } from '../types.ts';

const LOCAL_STORAGE_THEME_KEY = 'theme';

const DEFAULT_THEME: ThemeConfig = {
  mode: ThemeMode.LIGHT,
  color: ThemeColor.GREEN,
};

export const getTheme = (): ThemeConfig => {
  const stored = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  if (!stored) return DEFAULT_THEME;

  try {
    return JSON.parse(stored) as ThemeConfig;
  } catch {
    return DEFAULT_THEME;
  }
};

export const setTheme = (theme: ThemeConfig): void => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
  applyTheme(theme);
};

export const applyTheme = (theme: ThemeConfig = getTheme()): void => {
  const themeString = `${theme.mode}-${theme.color}`;
  document.documentElement.setAttribute('data-theme', themeString);
};

export const initTheme = (): void => {
  applyTheme();
};

const getThemeLabels = (): ThemeLabels => {
  const lang = getLanguage();
  return translations[lang].themeLabels;
};

const getModeLabel = (mode: ThemeMode, labels: ThemeLabels): string => {
  return mode === ThemeMode.LIGHT ? labels.light : labels.dark;
};

const getColorLabel = (color: ThemeColor, labels: ThemeLabels): string => {
  switch (color) {
    case ThemeColor.GREEN:
      return labels.green;
    case ThemeColor.BLUE:
      return labels.blue;
    case ThemeColor.RED:
      return labels.red;
    default:
      return labels.green;
  }
};

export const renderThemeDropdown = (anchor: HTMLElement): void => {
  const currentTheme = getTheme();
  const labels = getThemeLabels();

  const dropdown: HTMLDivElement = Dropdown(anchor, {
    id: 'theme-dropdown',
  });
  dropdown.style.top = `${anchor.offsetTop + anchor.offsetHeight}px`;
  dropdown.style.left = `${anchor.offsetLeft}px`;

  // Theme mode section
  const modeLabel: HTMLDivElement = Div({
    className: 'dropdown-section-label',
    text: labels.theme,
  });
  dropdown.appendChild(modeLabel);

  Object.values(ThemeMode).forEach((mode): void => {
    const isSelected: boolean = currentTheme.mode === mode;
    const option: HTMLDivElement = Div({
      className: `dropdown-option${isSelected ? ' selected' : ''}`,
      text: getModeLabel(mode, labels),
      onClick: (): void => {
        if (mode !== currentTheme.mode) {
          setTheme({ ...currentTheme, mode });
          dropdown.remove();
          renderThemeDropdown(anchor);
        }
      },
    });
    dropdown.appendChild(option);
  });

  // Color section
  const colorLabel: HTMLDivElement = Div({
    className: 'dropdown-section-label',
    text: labels.color,
  });
  dropdown.appendChild(colorLabel);

  Object.values(ThemeColor).forEach((color): void => {
    const isSelected: boolean = currentTheme.color === color;
    const option: HTMLDivElement = Div({
      className: `dropdown-option${isSelected ? ' selected' : ''}`,
      text: getColorLabel(color, labels),
      onClick: (): void => {
        if (color !== currentTheme.color) {
          setTheme({ ...currentTheme, color });
          dropdown.remove();
          renderThemeDropdown(anchor);
        }
      },
    });
    dropdown.appendChild(option);
  });

  document.body.appendChild(dropdown);
};
