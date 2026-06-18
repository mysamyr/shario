let text: string = '';

export const getText = (): string => text;
export const setText = (newText: string): void => {
  text = newText;
};
