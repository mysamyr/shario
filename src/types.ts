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
  type: string | null;
  created: number | null;
};
