import { PLATFORM_IS_NOT_SUPPORTED } from '../constants/errors.ts';

const commands = (): [string] | [string, string[]] => {
  switch (Deno.build.os) {
    case 'android':
    case 'linux':
      return ['xdg-open'];
    case 'darwin':
      return ['open'];
    case 'windows':
      return ['cmd', ['/c', 'start']];
    default:
      throw new Error(PLATFORM_IS_NOT_SUPPORTED);
  }
};

export const openUrlInBrowser = (url: string) => {
  try {
    const [command, args = []] = commands();
    const process: Deno.Command = new Deno.Command(command, {
      args: [...args, encodeURI(url)],
      stdin: 'piped',
      stdout: 'piped',
    });
    process.spawn();
  } catch (e) {
    console.error(e);
  }
};
