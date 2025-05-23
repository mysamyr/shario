import { join } from '@std/path';
import { Application, Context, Next } from '@oak/oak';
import router from './router.ts';
import requestLogger from './middlewares/request-logger.ts';
import responseTime from './middlewares/response-time.ts';
import errorHandler from './middlewares/error-handler.ts';
import { openUrlInBrowser } from './services/open.ts';
import { ENV, PORT } from './config.ts';

const app: Application = new Application();

app.use(requestLogger);
app.use(errorHandler);
app.use(responseTime);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context: Context, next: Next) => {
  try {
    await context.send({
      root: join(import.meta.dirname as string, '..', 'public'),
      index: 'index.html',
    });
  } catch {
    await next();
  }
});

app.addEventListener('error', (evt): void => {
  console.log(evt.error);
});

app.addEventListener('listen', ({ port }): void => {
  console.log('Start listening on http://localhost:' + port);
  if (ENV === 'production') {
    openUrlInBrowser(`http://localhost:${port}`);
  }
});

await app.listen({ port: PORT });
