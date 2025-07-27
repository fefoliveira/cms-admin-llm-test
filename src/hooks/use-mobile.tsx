import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return isMobile;
}

export function useResponsive(
  query: 'up' | 'down' | 'between' | 'only', 
  start: Breakpoint | number, 
  end?: Breakpoint | number
) {
  const theme = useTheme();
  
  const mediaUp = useMediaQuery(theme.breakpoints.up(start));
  const mediaDown = useMediaQuery(theme.breakpoints.down(start));
  const mediaBetween = useMediaQuery(
    theme.breakpoints.between(start as Breakpoint, end as Breakpoint)
  );
  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// Helper hooks for common breakpoints
export function useIsTablet() {
  return useResponsive('between', 'sm', 'md');
}

export function useIsDesktop() {
  return useResponsive('up', 'lg');
}

export function useIsSmallScreen() {
  return useResponsive('down', 'sm');
}
