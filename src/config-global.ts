import { paths } from './routes/paths';

// ----------------------------------------------------------------------
// CONFIG DO MINIMALS.CC:
export const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;

// ----------------------------------------------------------------------
// CONFIG DO PAINEL DO MOTOR:

// export const HOST_API = 'https://test.roxwallet.roxcode.io';
// export const ASSETS_API = 'https://test.roxwallet.roxcode.io';
export const HOST_API = 'http://localhost:2020';
export const ASSETS_API = 'http://localhost:2020';

export const PATH_AFTER_LOGIN = paths.dashboard.rules.root;