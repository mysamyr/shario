import { Context, Next } from '@oak/oak';

export default async (ctx: Context, next: Next): Promise<void> => {
  await next();
  const rt: string = ctx.response.headers.get('X-Response-Time') as string;
  console.info(
    `${ctx.request.method} ${
      decodeURIComponent(ctx.request.url.pathname)
    } ${ctx.request.ip} - ${rt} - ${ctx.response.status}`,
  );
};
