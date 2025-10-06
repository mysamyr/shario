const QRs: Set<string> = new Set();

export function getQRs(): string[] {
  return Array.from(QRs);
}

export function setQRs(qr: string[]): void {
  qr.forEach((q: string) => QRs.add(q));
}
