import { isPortOpen } from './services/addresses.ts';

export async function pickOpenPort(startPort: number): Promise<number> {
  let port: number = startPort;
  while (true) {
    if (await isPortOpen(port)) {
      break;
    }
    port++;
  }
  return port;
}
