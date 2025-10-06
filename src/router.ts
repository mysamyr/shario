import { Context, Router, Status } from '@oak/oak';
import {
  archiveFiles,
  deleteFiles,
  downloadFile,
  getInfo,
  getQRCode,
  renameFile,
  saveFile,
  updateText,
} from './controller.ts';
import { RenameFileBody } from './types.ts';
import { NO_BODY, NO_FILENAME_PROVIDED } from './constants/errors.ts';

const router: Router = new Router();

router.get('/info', (ctx: Context): void => {
  ctx.response.body = getInfo();
});

router.get('/files/:file', (ctx: Context): void => {
  const filename: string = ctx.params.file;
  if (!filename) ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);

  ctx.response.body = downloadFile(filename);
});

router.get('/files', async (ctx: Context): Promise<void> => {
  const filenamesString: string = ctx.request.url.searchParams.get('file');
  if (!filenamesString) ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);

  const filenames: string[] = filenamesString.split(',');

  ctx.response.body = await archiveFiles(filenames);
});

router.get('/qrcodes/:file', (ctx: Context): void => {
  const filename: string = ctx.params.file;
  if (!filename) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  ctx.response.body = getQRCode(filename);
});

router.post('/', async (ctx: Context): Promise<void> => {
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, NO_BODY);
  }
  await saveFile(ctx.request, ctx.response);
  ctx.response.status = Status.Created;
});

router.put('/text', async (ctx: Context): Promise<void> => {
  if (!ctx.request.hasBody) {
    ctx.throw(Status.BadRequest, NO_BODY);
  }
  await updateText(ctx.request, ctx.response);
  ctx.response.status = Status.Created;
});

router.put('/:file', async (ctx: Context): Promise<void> => {
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

router.delete('/', async (ctx: Context): Promise<void> => {
  const filenamesString: string = ctx.request.url.searchParams.get('file');

  if (!filenamesString) {
    ctx.throw(Status.BadRequest, NO_FILENAME_PROVIDED);
  }
  const filenames: string[] = filenamesString.split(',');

  await deleteFiles(filenames);
  ctx.response.status = Status.NoContent;
});

export default router;
