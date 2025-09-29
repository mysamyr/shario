export type FileEntry = {
  name: string;
  size: number;
  type: string;
  created: number | null;
  modified: number | null;
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

type Titles = {
  upload: string;
  clearText: string;
  copyText: string;
  clearFiles: string;
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
  noFilesToClear: string;
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
  mainTitle: string;
  uploadBtnTitle: string;
  uploadBtn: string;
  sharedTextTitle: string;
  sharedTextPlaceholder: string;
  filesTitle: string;
  releaseToUpload: string;
  noLocations: string;
  noFilesUploaded: string;
  titles: Titles;
  messages: Messages;
  errorMessages: ErrorMessages;
  modals: Modals;
};
