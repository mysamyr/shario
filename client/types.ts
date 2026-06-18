import type { LanguageCode } from './constants/language.ts';
import type { COLUMN_KEYS } from './constants/table.ts';
import type { ThemeColor, ThemeMode } from './constants/theme.ts';

export type FileEntry = {
  name: string;
  size: number;
  type: string | null;
  created: number | null;
};

export type TableColumnConfig = {
  key: COLUMN_KEYS;
  minWidth?: string;
  sortable?: boolean;
  grow?: boolean;
  headerCellClassName?: string;
  bodyCellClassName?: string;
  renderColumnData: (file: FileEntry) => HTMLTableCellElement;
  renderHeaderData?: () => HTMLElement;
};

export type Info = {
  locations: string[];
  port: number;
  files: FileEntry[];
  text: string;
};

export type ApiError = { status: number; message: string };

export type Language = {
  name: string;
  code: LanguageCode;
};

export type ThemeLabels = {
  theme: string;
  color: string;
  light: string;
  dark: string;
  green: string;
  blue: string;
  red: string;
};

export type ThemeConfig = {
  mode: ThemeMode;
  color: ThemeColor;
};

export type Titles = {
  changeLanguage: string;
  changeTheme: string;
  showQRs: string;
  showHelp: string;
  uploadFiles: string;
  downloadFiles: string;
  deleteFiles: string;
  saveNote: string;
  copyText: string;
  clearText: string;
  openFile: string;
  downloadFile: string;
  renameFile: string;
  deleteFile: string;
};

type Messages = {
  fileUploaded: string;
  filesUploaded: string;
  fileRenamed: string;
  fileDeleted: string;
  filesDeleted: string;
};

type ErrorMessages = {
  noFilenameProvided: string;
  filenameSlashes: string;
  filenameBackslashes: string;
  filenameColons: string;
  filenameAsterisks: string;
  filenameQuestionMarks: string;
  filenameDoubleQuotes: string;
  filenameLessThan: string;
  filenameGreaterThan: string;
  filenamePipes: string;
  filenameTooLong: string;
  filenameTooShort: string;
  filenameStartsDot: string;
  filenameEndsDot: string;
  nameWasNotChanged: string;
  filesTooBig: (files: string) => string;
  uploadError: string;
  noFilesToUpload: string;
  noFilesSelected: string;
  nothingToSave: string;
  apiError: (status: number, message: string) => string;
};

type Modal = {
  title: string;
  text?: string;
  buttons: {
    submit: string;
    cancel: string;
  };
};

type Modals = {
  renameFile: Modal;
  uploadFiles: Modal;
};

type HelpSection = {
  title: string;
  items: string[];
};

type Help = {
  title: string;
  sections: HelpSection[];
};

export type Translation = {
  filesHeader: string;
  noteHeader: string;
  sharedTextPlaceholder: string;
  noLocations: string;
  titles: Titles;
  table: Record<COLUMN_KEYS, string>;
  messages: Messages;
  errorMessages: ErrorMessages;
  modals: Modals;
  help: Help;
  themeLabels: ThemeLabels;
};
