import { isHttpError } from '@oak/commons/http_errors';
import { Context, Next, Status } from '@oak/oak';
import { ENV } from './../config.ts';
import { INTERNAL_SERVER_ERROR } from '../constants/errors.ts';

function isDevelopmentMode(): boolean {
  return ENV === 'development';
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
      message = isDevelopmentMode() ? message : INTERNAL_SERVER_ERROR;
    }
    if (isDevelopmentMode()) {
      console.error(err);
    }
    ctx.response.status = status;
    ctx.response.body = { status, message };
  }
};
