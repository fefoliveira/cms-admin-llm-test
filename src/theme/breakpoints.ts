// ----------------------------------------------------------------------

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// Custom breakpoints for better responsivity
export const customBreakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
  widescreen: 1536,
};

// Helper functions for responsive design
export const up = (breakpoint: keyof typeof customBreakpoints) =>
  `@media (min-width: ${customBreakpoints[breakpoint]}px)`;

export const down = (breakpoint: keyof typeof customBreakpoints) =>
  `@media (max-width: ${customBreakpoints[breakpoint] - 1}px)`;

export const between = (
  start: keyof typeof customBreakpoints,
  end: keyof typeof customBreakpoints
) =>
  `@media (min-width: ${customBreakpoints[start]}px) and (max-width: ${
    customBreakpoints[end] - 1
  }px)`;

export const only = (breakpoint: keyof typeof customBreakpoints) => {
  const breakpointKeys = Object.keys(customBreakpoints) as Array<
    keyof typeof customBreakpoints
  >;
  const index = breakpointKeys.indexOf(breakpoint);

  if (index === breakpointKeys.length - 1) {
    return up(breakpoint);
  }

  const nextBreakpoint = breakpointKeys[index + 1];
  return between(breakpoint, nextBreakpoint);
};
