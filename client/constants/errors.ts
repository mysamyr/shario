import { getLanguage } from '../features/language.ts';
import translations from '../constants/language.ts';

export const NO_FILENAME_PROVIDED: () => string = () =>
  translations[getLanguage()].errorMessages.noFilenameProvided;
export const FILENAME_SLASHES: () => string = () =>
  translations[getLanguage()].errorMessages.filenameSlashes;
export const FILENAME_BACKSLASHES: () => string = () =>
  translations[getLanguage()].errorMessages.filenameBackslashes;
export const FILENAME_COLONS: () => string = () =>
  translations[getLanguage()].errorMessages.filenameColons;
export const FILENAME_ASTERISKS: () => string = () =>
  translations[getLanguage()].errorMessages.filenameAsterisks;
export const FILENAME_QUESTION_MARKS: () => string = () =>
  translations[getLanguage()].errorMessages.filenameQuestionMarks;
export const FILENAME_DOUBLE_QUOTES: () => string = () =>
  translations[getLanguage()].errorMessages.filenameDoubleQuotes;
export const FILENAME_LESS_THAN: () => string = () =>
  translations[getLanguage()].errorMessages.filenameLessThan;
export const FILENAME_GREATER_THAN: () => string = () =>
  translations[getLanguage()].errorMessages.filenameGreaterThan;
export const FILENAME_PIPES: () => string = () =>
  translations[getLanguage()].errorMessages.filenamePipes;
export const FILENAME_TOO_LONG: () => string = () =>
  translations[getLanguage()].errorMessages.filenameTooLong;
export const FILENAME_TOO_SHORT: () => string = () =>
  translations[getLanguage()].errorMessages.filenameTooShort;
export const FILENAME_STARTS_DOT: () => string = () =>
  translations[getLanguage()].errorMessages.filenameStartsDot;
export const FILENAME_ENDS_DOT: () => string = () =>
  translations[getLanguage()].errorMessages.filenameEndsDot;
export const NAME_WAS_NOT_CHANGED: () => string = () =>
  translations[getLanguage()].errorMessages.nameWasNotChanged;
export const FILES_TOO_BIG: (files: string) => string =
  translations[getLanguage()].errorMessages.filesTooBig;
export const UPLOAD_ERROR: () => string = () =>
  translations[getLanguage()].errorMessages.uploadError;
export const NO_FILES_TO_UPLOAD: () => string = () =>
  translations[getLanguage()].errorMessages.noFilesToUpload;
export const NO_FILES_SELECTED: () => string = () =>
  translations[getLanguage()].errorMessages.noFilesSelected;
export const NOTHING_TO_SAVE: () => string = () =>
  translations[getLanguage()].errorMessages.nothingToSave;
export const API_ERROR_$: (status: number, message: string) => string =
  translations[getLanguage()].errorMessages.apiError;
