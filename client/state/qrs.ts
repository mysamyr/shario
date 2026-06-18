const QRs: Set<string> = new Set();

export const getQRs = (): string[] => Array.from(QRs);

export const setQRs = (qr: string[]): void => {
  qr.forEach((q: string) => QRs.add(q));
};
