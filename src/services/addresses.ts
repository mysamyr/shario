export const getAddresses = (): string[] => {
  const interfaces: Deno.NetworkInterfaceInfo[] = Deno.networkInterfaces();

  return interfaces.reduce((acc: string[], i: Deno.NetworkInterfaceInfo) => {
    if (i.family === 'IPv4' && !i.address.startsWith('127.')) {
      acc.push(i.address);
    }
    return acc;
  }, []);
};
