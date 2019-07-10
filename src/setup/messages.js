import { addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import de from 'react-intl/locale-data/de';
import pt from 'react-intl/locale-data/pt';

import localeEn from '../i18n/en';
import localeEs from '../i18n/es';
import localeFr from '../i18n/fr';
import localeDe from '../i18n/de';
import localePt from '../i18n/pt';

const locales = {
  en: localeEn,
  es: localeEs,
  fr: localeFr,
  de: localeDe,
  pt: localePt
};

addLocaleData([...en, ...es, ...fr, ...de, ...pt]);

export const messages = (locale) => {

  if (!locale) {
    return locales.en;
  }

  const languageWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];

  return locales[languageWithoutRegionCode] || locales[locale] || locales.en;
};
