export type Info = {
  locations: string[];
  port: number;
  files: string[];
  text: string;
};

export type ApiError = { status: number; message: string };
