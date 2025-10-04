import { FileEntry } from '../types.ts';

type Config = {
  files: FileEntry[];
  selectedFiles: Set<string>;
};

const config: Config = {
  files: [],
  selectedFiles: new Set<string>(),
};

export const getFiles = (): FileEntry[] => config.files;

export const setFiles = (items: FileEntry[]): void => {
  config.files = items;
  // Clear selected files when the file list is updated
  config.selectedFiles.clear();
};

export const getSelectedFiles = (): string[] =>
  Array.from(config.selectedFiles);

export const handleRowSelect = (filename: string, checked: boolean) => {
  if (checked) config.selectedFiles.add(filename);
  else config.selectedFiles.delete(filename);
};

export const handleSelectAll = (allFilenames: string[], checked: boolean) => {
  if (checked) allFilenames.forEach((name) => config.selectedFiles.add(name));
  else config.selectedFiles.clear();
};
