import { pickOpenPort } from './helpers.ts';

export const PORT: number = await pickOpenPort(
  Number(Deno.env.get('PORT') || 3210),
);
export const ENV: string = Deno.env.get('ENV') || 'development';
