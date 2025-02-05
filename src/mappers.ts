import { Info } from './types.ts';

export function mapInfo(
  locations: string[],
  port: number,
  files: string[],
  text: string,
): Info {
  return {
    locations,
    port,
    files,
    text,
  };
}
