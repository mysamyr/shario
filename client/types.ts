export type FileEntry = {
  name: string;
  size: number;
  type: string | null;
  created: number | null;
};

export type Info = {
  locations: string[];
  port: number;
  files: FileEntry[];
  text: string;
};

export type ApiError = { status: number; message: string };

export type FileListItem = {
  name: string;
  input: HTMLInputElement;
  file: File;
  error?: string;
};

export type Language = {
  name: string;
  code: string;
};

export type Titles = {
  changeLanguage: string;
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

export type TableLabels = {
  name: string;
  size: string;
  type: string;
  created: string;
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
  clearFiles: Modal;
  renameFile: Modal;
  uploadFiles: Modal;
};

export type Translation = {
  filesHeader: string;
  noteHeader: string;
  sharedTextPlaceholder: string;
  noLocations: string;
  titles: Titles;
  table: TableLabels;
  messages: Messages;
  errorMessages: ErrorMessages;
  modals: Modals;
};

export type TableColumn = {
  key: string;
  sortable?: boolean;
  minWidth?: string;
};
