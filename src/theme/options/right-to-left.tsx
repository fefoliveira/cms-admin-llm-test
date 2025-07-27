import { useEffect } from 'react';

import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  themeDirection: 'ltr' | 'rtl';
};

export default function RTL({ children, themeDirection }: Props) {
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  if (themeDirection === 'rtl') {
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });

    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}