import { Div, Image, Paragraph } from '../components.ts';
import { getLanguage } from '../features/language.ts';
import translations from '../constants/language.ts';
import { getQRs } from '../state/qrs.ts';

export default (): HTMLDivElement => {
  const port = globalThis.location.port;
  const locations = getQRs();
  const container = Div({
    className: 'modal-container',
  });

  if (!locations.length) {
    const p = Paragraph({
      text: translations[getLanguage()].noLocations,
    });
    container.appendChild(p);
    return container;
  }

  const renderLocation = (location: string): void => {
    const locationContainer = Div({
      className: 'location',
    });
    const qr = Image({
      src: `/qrcodes/${location}_${port}.png`,
      title: `${location}:${port}`,
    });
    const ip = Paragraph({ text: `${location}:${port}` });
    locationContainer.append(qr, ip);
    container.appendChild(locationContainer);
  };

  locations.forEach(renderLocation);
  return container;
};
