export type Info = {
  locations: string[];
  port: number;
  files: string[];
  text: string;
};
export type InputModalProps = {
  headerText: string;
  submitText: string;
  filename: string;
  onSubmit: (param1: string, param2: string) => void;
};
