import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ----------------------------------------------------------------------

const resources = {
  pt: {
    translation: {
      // Add your portuguese translations here
      'loading': 'Carregando...',
      'dashboard': 'Dashboard',
      'rules': 'Regras',
      'conversion_rates': 'Taxas de Conversão',
      'users': 'Usuários',
      'variables': 'Variáveis',
      'admin_logs': 'Logs de Admin',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;