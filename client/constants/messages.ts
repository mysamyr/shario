import { getLanguage, translations } from '../features/language.ts';

export const FILE_UPLOADED: () => string = () =>
  translations[getLanguage()].messages.fileUploaded;
export const FILES_UPLOADED: () => string = () =>
  translations[getLanguage()].messages.filesUploaded;
export const FILE_RENAMED: () => string = () =>
  translations[getLanguage()].messages.fileRenamed;
export const FILE_DELETED: () => string = () =>
  translations[getLanguage()].messages.fileDeleted;
export const FILES_DELETED: () => string = () =>
  translations[getLanguage()].messages.filesDeleted;
