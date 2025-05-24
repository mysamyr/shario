import { Context, Next, Status } from '@oak/oak';
import { ACCESS_DENIED } from '../constants/errors.ts';

function isLocalNetwork(ip: string): boolean {
  return (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
  );
}

export default async (ctx: Context, next: Next): Promise<void> => {
  const ip: string = ctx.request.ip;
  console.log(`Request from IP: ${ip}`);
  if (!isLocalNetwork(ip)) {
    ctx.throw(Status.Forbidden, ACCESS_DENIED);
  }
  await next();
};
