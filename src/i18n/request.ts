import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupère la locale demandée (ex. segment [locale])
  const requested = await requestLocale;
  // Vérifie que c'est une locale supportée
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  // Charge dynamiquement les messages JSON pour la locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return { locale, messages };
});