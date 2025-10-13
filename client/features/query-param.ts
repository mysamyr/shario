export const getQueryParam = (key: string): string | null => {
  const url = new URL(globalThis.location.href);
  return url.searchParams.get(key);
};

export const setQueryParam = (key: string, value: string): void => {
  const url = new URL(globalThis.location.href);
  url.searchParams.set(key, value);
  history.replaceState(null, '', url.toString());
};

export const clearUrlViewKey = (key: string): void => {
  const url = new URL(globalThis.location.href);
  url.searchParams.delete(key);
  history.replaceState(null, '', url.toString());
};
