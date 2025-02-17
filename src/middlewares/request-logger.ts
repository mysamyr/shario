import { Context, Next } from '@oak/oak';

export default async (context: Context, next: Next): Promise<void> => {
  await next();
  // @ts-ignore-next-line
  const rt: string = context.response.headers.get('X-Response-Time');
  console.log(
    `${context.request.method} ${
      decodeURIComponent(context.request.url.pathname)
    } - ${rt} - ${context.response.status}`,
  );
};
