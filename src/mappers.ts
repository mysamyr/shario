import type { Info } from './types.ts';

export const mapInfo = (
  locations: string[],
  port: number,
  files: string[],
  text: string,
): Info => ({
  locations,
  port,
  files,
  text,
});
