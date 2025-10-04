import { Div, Image, Paragraph } from '../components.ts';
import { getLanguage, translations } from '../features/language.ts';
import { getQRs } from '../state/qrs.ts';

export default (): HTMLDivElement => {
  const port: string = globalThis.location.port;
  const locations: string[] = getQRs();
  const container: HTMLDivElement = Div({
    className: 'modal-container',
  });

  if (!locations.length) {
    const p: HTMLParagraphElement = Paragraph({
      text: translations[getLanguage()].noLocations,
    });
    container.appendChild(p);
    return container;
  }

  const renderLocation = (location: string): void => {
    const locationContainer: HTMLDivElement = Div({
      className: 'location',
    });
    const qr: HTMLImageElement = Image({
      src: `/qrcodes/${location}_${port}.png`,
    });
    const ip: HTMLParagraphElement = Paragraph({ text: `${location}:${port}` });
    locationContainer.append(qr, ip);
    container.appendChild(locationContainer);
  };

  locations.forEach(renderLocation);
  return container;
};
