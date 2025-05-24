import { Context, Router, Status } from '@oak/oak';
import {
  deleteFile,
  getFile,
  getInfo,
  getQRCode,
  renameFile,
  saveFile,
} from './controller.ts';
import { RenameFileBody } from './types.ts';
import { NO_FILE, NO_FILENAME_PROVIDED } from './constants/errors.ts';

const router: Router = new Router();

router.get('/info', (ctx: Context): void => {
  ctx.response.body = getInfo();
});

router.get('/files/:file', (ctx: Context): void => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  ctx.response.body = getFile(filename);
});

router.get('/qrcodes/:file', (ctx: Context): void => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  ctx.response.body = getQRCode(filename);
});

router.post('/', async (ctx: Context): Promise<void> => {
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, NO_FILE);
  }
  await saveFile(ctx.request, ctx.response);
  ctx.response.status = Status.Created;
});

router.put('/:file', async (ctx: Context): Promise<void> => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  const body: RenameFileBody = await ctx.request.body.json();
  const newFilename: string = body.name;
  if (!newFilename) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  await renameFile(filename, newFilename);
  ctx.response.status = Status.NoContent;
});

router.delete('/:file', async (ctx: Context): Promise<void> => {
  // @ts-ignore-next-line
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  await deleteFile(filename);
  ctx.response.status = Status.NoContent;
});

export default router;
