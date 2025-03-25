export function getAddresses(): string[] {
  const interfaces: Deno.NetworkInterfaceInfo[] = Deno.networkInterfaces();

  return interfaces.reduce((acc: string[], i: Deno.NetworkInterfaceInfo) => {
    if (i.family === 'IPv4' && !i.address.startsWith('127.')) {
      acc.push(i.address);
    }
    return acc;
  }, []);
}

// deno-lint-ignore require-await
export async function isPortOpen(startPort: number): Promise<boolean> {
  try {
    const listener = Deno.listen({
      port: startPort,
    });
    listener.close();
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.AddrInUse) {
      return false;
    }
    throw error;
  }
}