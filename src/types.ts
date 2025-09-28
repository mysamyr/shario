export type Info = {
  locations: string[];
  port: number;
  files: string[];
  text: string;
};

export type RenameFileBody = {
  name: string;
};

export type FileEntry = {
  name: string;
  size: number;
  type: string;
  created: number | null;
  modified: number | null;
}