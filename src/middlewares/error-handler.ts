import { isHttpError } from 'jsr:@oak/commons/http_errors';
import { Context, Next, Status } from 'jsr:@oak/oak';
import * as config from './../config.ts';

function isDevelopmentMode(): boolean {
  return config.ENV === 'dev' || config.ENV === 'development';
}

export default async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    // @ts-ignore-next-line
    let message = err.message;
    // @ts-ignore-next-line
    const status = err.status || err.statusCode || Status.InternalServerError;

    if (!isHttpError(err)) {
      message = isDevelopmentMode() ? message : 'Internal Server Error';
    }
    if (isDevelopmentMode()) {
      console.error(err);
    }
    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
};
