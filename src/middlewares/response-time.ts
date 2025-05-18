import { Context, Next } from '@oak/oak';

export default async (context: Context, next: Next): Promise<void> => {
  const start: number = Date.now();
  try {
    await next();
  } finally {
    const ms: number = Date.now() - start;
    context.response.headers.set('X-Response-Time', `${ms}ms`);
  }
};
