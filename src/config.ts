export const PORT: number = Number(Deno.env.get('PORT') || 3000);
export const ENV: string = Deno.env.get('ENV') || 'development';
