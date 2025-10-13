import { Div } from '../components.ts';
import { COLUMN_KEYS } from '../constants/table.ts';
import translations, {
  LanguageCode,
  LANGUAGES_CONFIG,
} from '../constants/language.ts';

import type { Language, TableLabels, Titles, Translation } from '../types.ts';

const LOCAL_STORAGE_LANGUAGE_KEY = 'language';

export const getLanguage = (): string =>
  localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || LanguageCode.EN;

export const setLanguage = (lang: LanguageCode): void => {
  localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, lang);
};

const applyHeaders = (lang: Translation): void => {
  const filesHeader: HTMLHeadingElement = document.getElementById<
    HTMLHeadingElement
  >(
    'files-header',
  );
  filesHeader.innerText = lang.filesHeader;
  const noteHeader: HTMLHeadingElement = document.getElementById<
    HTMLHeadingElement
  >(
    'note-header',
  );
  noteHeader.innerText = lang.noteHeader;
};

const applyTitles = (titles: Titles): void => {
  const language: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'language',
  );
  language.title = titles.changeLanguage;
  const showQRs: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'qr',
  );
  showQRs.title = titles.showQRs;
  const showHelp: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'help',
  );
  showHelp.title = titles.showHelp;

  const uploadFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'upload-files',
  );
  uploadFiles.title = titles.uploadFiles;
  const downloadFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'download-files',
  );
  downloadFiles.title = titles.downloadFiles;
  const deleteFiles: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'delete-files',
  );
  deleteFiles.title = titles.deleteFiles;

  const saveNote: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'save-as-file',
  );
  saveNote.title = titles.saveNote;
  const copyText: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'copy-text',
  );
  copyText.title = titles.copyText;
  const clearText: HTMLDivElement = document.getElementById<HTMLDivElement>(
    'clear-text',
  );
  clearText.title = titles.clearText;
};

const applyTableLabels = (labels: TableLabels): void => {
  Object.values(COLUMN_KEYS).forEach((key: string): void => {
    if (!labels[key]) return;
    const header: HTMLTableCellElement = document.getElementById<
      HTMLTableCellElement
    >(`file_${key}`);
    header.innerText = labels[key];
  });
};

const applyFooter = (lang: Translation): void => {
  const filesFooterLink: HTMLTableCellElement = document.getElementById<
    HTMLDivElement
  >('files-footer-link');
  filesFooterLink.innerText = lang.filesHeader;
  const notesFooterLink: HTMLTableCellElement = document.getElementById<
    HTMLDivElement
  >('notes-footer-link');
  notesFooterLink.innerText = lang.noteHeader;
};

export const applyLanguage = (lang: string = getLanguage()): void => {
  const langTranslations: Translation = translations[lang];

  applyHeaders(langTranslations);
  applyTitles(langTranslations.titles);
  applyTableLabels(langTranslations.table);
  applyFooter(langTranslations);

  const textarea: HTMLTextAreaElement = document.querySelector<
    HTMLTextAreaElement
  >(
    'textarea',
  );
  textarea.placeholder = langTranslations.sharedTextPlaceholder;
};

export const renderLanguageDropdown = (anchor: HTMLElement) => {
  const existing: HTMLDivElement | null = document.getElementById(
    'language-dropdown',
  );
  if (existing) existing.remove();

  const dropdown: HTMLDivElement = Div({
    id: 'language-dropdown',
  });
  dropdown.style.top = `${anchor.offsetTop + anchor.offsetHeight}px`;
  dropdown.style.left = `${anchor.offsetLeft}px`;

  LANGUAGES_CONFIG.forEach((lang: Language): void => {
    const option: HTMLDivElement = Div({
      className: 'language-option',
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

  setTimeout((): void => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (!dropdown.contains(e.target as Node) && e.target !== anchor) {
        dropdown.remove();
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, 0);
};
