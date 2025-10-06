import { FileEntry } from '../types.ts';

type Config = {
  files: FileEntry[];
  selectedFiles: Set<string>;
};

const config: Config = {
  files: [],
  selectedFiles: new Set<string>(),
};

export function getFiles(): FileEntry[] {
  return config.files;
}

export function setFiles(items: FileEntry[]): void {
  config.files = items;
  // Clear selected files when the file list is updated
  config.selectedFiles.clear();
}

export function getSelectedFiles(): string[] {
  return Array.from(config.selectedFiles);
}

export function handleRowSelect(filename: string, checked: boolean) {
  if (checked) config.selectedFiles.add(filename);
  else config.selectedFiles.delete(filename);
}

export function handleSelectAll(allFilenames: string[], checked: boolean) {
  if (checked) allFilenames.forEach((name) => config.selectedFiles.add(name));
  else config.selectedFiles.clear();
}
