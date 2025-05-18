export function validateFilename(
  filename: string,
): string | undefined {
  if (!filename) {
    return 'No filename provided';
  }
  if (filename.includes('/')) {
    return 'Filename cannot contain slashes';
  }
  if (filename.includes('\\')) {
    return 'Filename cannot contain backslashes';
  }
  if (filename.includes(':')) {
    return 'Filename cannot contain colons';
  }
  if (filename.includes('*')) {
    return 'Filename cannot contain asterisks';
  }
  if (filename.includes('?')) {
    return 'Filename cannot contain question marks';
  }
  if (filename.includes('"')) {
    return 'Filename cannot contain double quotes';
  }
  if (filename.includes('<')) {
    return 'Filename cannot contain less than signs';
  }
  if (filename.includes('>')) {
    return 'Filename cannot contain greater than signs';
  }
  if (filename.includes('|')) {
    return 'Filename cannot contain pipes';
  }
  if (filename.length > 255) {
    return 'Filename cannot be longer than 255 characters';
  }
  if (filename.length < 1) {
    return 'Filename cannot be empty';
  }
  if (filename.startsWith('.')) {
    return 'Filename cannot start with a dot';
  }
  if (filename.endsWith('.')) {
    return 'Filename cannot end with a dot';
  }
}
