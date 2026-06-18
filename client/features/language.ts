import { Div, Dropdown } from '../components.ts';
import { COLUMN_KEYS } from '../constants/table.ts';
import translations, {
  LanguageCode,
  LANGUAGES_CONFIG,
} from '../constants/language.ts';

import type { Language, Titles, Translation } from '../types.ts';

const LOCAL_STORAGE_LANGUAGE_KEY = 'language';

export const getLanguage = (): LanguageCode =>
  localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) as LanguageCode ||
  LanguageCode.EN;

export const setLanguage = (lang: LanguageCode): void => {
  localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, lang);
};

const applyHeaders = (lang: Translation): void => {
  const filesHeader = document.getElementById(
    'files-header',
  ) as HTMLHeadingElement;
  filesHeader.innerText = lang.filesHeader;
  const noteHeader = document.getElementById(
    'note-header',
  ) as HTMLHeadingElement;
  noteHeader.innerText = lang.noteHeader;
};

const applyTitles = (titles: Titles): void => {
  const language = document.getElementById(
    'language',
  ) as HTMLDivElement;
  language.title = titles.changeLanguage;
  const theme = document.getElementById(
    'theme',
  ) as HTMLDivElement;
  theme.title = titles.changeTheme;
  const showQRs = document.getElementById(
    'qr',
  ) as HTMLDivElement;
  showQRs.title = titles.showQRs;
  const showHelp = document.getElementById(
    'help',
  ) as HTMLDivElement;
  showHelp.title = titles.showHelp;

  const uploadFiles = document.getElementById(
    'upload-files',
  ) as HTMLDivElement;
  uploadFiles.title = titles.uploadFiles;
  const downloadFiles = document.getElementById(
    'download-files',
  ) as HTMLDivElement;
  downloadFiles.title = titles.downloadFiles;
  const deleteFiles = document.getElementById(
    'delete-files',
  ) as HTMLDivElement;
  deleteFiles.title = titles.deleteFiles;

  const saveNote = document.getElementById(
    'save-as-file',
  ) as HTMLDivElement;
  saveNote.title = titles.saveNote;
  const copyText = document.getElementById(
    'copy-text',
  ) as HTMLDivElement;
  copyText.title = titles.copyText;
  const clearText = document.getElementById(
    'clear-text',
  ) as HTMLDivElement;
  clearText.title = titles.clearText;
};

const applyTableLabels = (labels: Record<COLUMN_KEYS, string>): void => {
  Object.values(COLUMN_KEYS).forEach((key): void => {
    if (!labels[key]) return;
    const header = document.getElementById(
      `file_${key}`,
    ) as HTMLTableCellElement;
    header.innerText = labels[key];
  });
};

const applyFooter = (lang: Translation): void => {
  const filesFooterLink = document.getElementById(
    'files-footer-link',
  ) as HTMLTableCellElement;
  filesFooterLink.innerText = lang.filesHeader;
  const notesFooterLink = document.getElementById(
    'notes-footer-link',
  ) as HTMLTableCellElement;
  notesFooterLink.innerText = lang.noteHeader;
};

export const applyLanguage = (lang: LanguageCode = getLanguage()): void => {
  const langTranslations = translations[lang];

  applyHeaders(langTranslations);
  applyTitles(langTranslations.titles);
  applyTableLabels(langTranslations.table);
  applyFooter(langTranslations);

  const textarea = document.querySelector<HTMLTextAreaElement>(
    'textarea',
  )!;
  textarea.placeholder = langTranslations.sharedTextPlaceholder;
};

export const renderLanguageDropdown = (anchor: HTMLElement) => {
  const dropdown: HTMLDivElement = Dropdown(anchor, {
    id: 'language-dropdown',
  });
  const activeLang = getLanguage();

  LANGUAGES_CONFIG.forEach((lang: Language): void => {
    const isSelected = lang.code === activeLang;
    const option: HTMLDivElement = Div({
      className: `dropdown-option${isSelected ? ' selected' : ''}`,
      text: lang.name,
      onClick: (): void => {
        if (lang.code !== getLanguage()) {
          setLanguage(lang.code);
          applyLanguage(lang.code);
        }
        dropdown.remove();
      },
    });
    dropdown.appendChild(option);
  });

  document.body.appendChild(dropdown);
};
