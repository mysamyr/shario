import type { FileEntry, Info } from './types.ts';

export const mapInfo = (
  locations: string[],
  port: number,
  files: FileEntry[],
  text: string,
): Info => ({
  locations,
  port,
  files,
  text,
});
