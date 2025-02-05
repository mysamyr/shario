import { join } from '@std/path';
import { Application } from '@oak/oak';
import router from './router.ts';
import requestLogger from './middlewares/request-logger.ts';
import responseTime from './middlewares/response-time.ts';
import errorHandler from './middlewares/error-handler.ts';
import { PORT } from './config.ts';

const app: Application = new Application();

app.use(requestLogger);
app.use(errorHandler);
app.use(responseTime);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
  try {
    await context.send({
      root: join(Deno.cwd(), 'public'),
      index: 'index.html',
    });
  } catch {
    await next();
  }
});

app.addEventListener('error', (evt) => {
  console.log(evt.error);
});

app.addEventListener('listen', ({ port }) => {
  console.log('Start listening on ' + port);
});

await app.listen({ port: PORT });
