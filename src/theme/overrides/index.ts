import { Theme } from '@mui/material/styles';

import { button } from './button';
import { card } from './card';

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
  const components = {
    ...button(theme),
    ...card(theme),
  };

  return components;
}