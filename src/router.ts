import { Context, Router, Status } from 'jsr:@oak/oak';
import {
  deleteFile,
  getFile,
  getInfo,
  getQRCode,
  saveFile,
} from './controller.ts';

const router: Router = new Router();

router.get('/info', (ctx: Context): void => {
  ctx.response.body = getInfo();
});

router.get('/files/:file', (ctx: Context): void => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, 'No file name provided');
  }
  ctx.response.body = getFile(filename);
});

router.get('/qrcodes/:file', (ctx: Context): void => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, 'No file name provided');
  }
  ctx.response.body = getQRCode(filename);
});

router.post('/', async (ctx: Context): Promise<void> => {
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, 'No file uploaded');
  }
  await saveFile(ctx.request, ctx.response);
  ctx.response.status = Status.Created;
});

router.delete('/:file', async (ctx: Context): Promise<void> => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, 'No file name provided');
  }
  await deleteFile(filename);
  ctx.response.status = Status.NoContent;
});

export default router;
