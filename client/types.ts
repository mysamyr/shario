export type Info = {
  locations: string[];
  port: number;
  files: string[];
  text: string;
};

export type InputModalProps = {
  headerText: string;
  submitText: string;
  filenames: string[];
  onSubmit: (param1: string[], param2: string) => void;
};

export type ApiError = { status: number; message: string };
