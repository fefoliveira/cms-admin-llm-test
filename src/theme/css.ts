import { alpha, Theme } from '@mui/material/styles';
import { dividerClasses } from '@mui/material/Divider';
import { checkboxClasses } from '@mui/material/Checkbox';
import { menuItemClasses } from '@mui/material/MenuItem';
import { autocompleteClasses } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export const paper = ({
  theme,
  bgcolor,
  dropdown,
}: {
  theme: Theme;
  bgcolor?: string;
  dropdown?: boolean;
}) => ({
  ...bgBlur({
    blur: 20,
    opacity: 0.9,
    color: theme.palette.background.paper,
    ...(!!bgcolor && {
      color: bgcolor,
    }),
  }),
  backgroundImage: 'url(/assets/cyan-blur.png), url(/assets/red-blur.png)',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundPosition: 'top right, left bottom',
  backgroundSize: '50%, 50%',
  ...(theme.direction === 'rtl' && {
    backgroundPosition: 'top left, right bottom',
  }),
  ...(dropdown && {
    padding: theme.spacing(0.5),
    boxShadow: theme.customShadows.dropdown,
    borderRadius: Number(theme.shape.borderRadius) * 1.25,
  }),
});

// ----------------------------------------------------------------------

export const menuItem = (theme: Theme) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.75, 1),
  borderRadius: Number(theme.shape.borderRadius) * 0.75,
  '&:not(:last-of-type)': {
    marginBottom: 4,
  },
  [`&.${menuItemClasses.selected}`]: {
    fontWeight: theme.typography.fontWeightSemiBold,
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  [`& .${checkboxClasses.root}`]: {
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(-0.5),
    marginRight: theme.spacing(0.5),
  },
  [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  [`&+.${dividerClasses.root}`]: {
    margin: theme.spacing(0.5, 0),
  },
});

// ----------------------------------------------------------------------

type BgBlurProps = {
  blur?: number;
  opacity?: number;
  color?: string;
  imgUrl?: string;
};

export function bgBlur(props?: BgBlurProps) {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    } as const;
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

// ----------------------------------------------------------------------

type BgGradientProps = {
  direction?: string;
  color?: string;
  startColor?: string;
  endColor?: string;
  imgUrl?: string;
};

export function bgGradient(props?: BgGradientProps) {
  const direction = props?.direction || 'to bottom';
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  const imgUrl = props?.imgUrl;
  const color = props?.color;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${
        endColor || color
      }), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

// ----------------------------------------------------------------------

export function textGradient(value: string) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
}

// ----------------------------------------------------------------------

export const hideScroll = {
  x: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  y: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
} as const;

// ----------------------------------------------------------------------
// Responsive utility styles
// ----------------------------------------------------------------------

export const responsiveStyles = {
  // Visibility utilities
  showMobile: {
    display: { xs: 'block', sm: 'none' },
  },
  hideMobile: {
    display: { xs: 'none', sm: 'block' },
  },
  showTablet: {
    display: { xs: 'none', sm: 'block', md: 'none' },
  },
  hideTablet: {
    display: { xs: 'block', sm: 'none', md: 'block' },
  },
  showDesktop: {
    display: { xs: 'none', md: 'block' },
  },
  hideDesktop: {
    display: { xs: 'block', md: 'none' },
  },
  
  // Text utilities
  responsiveText: {
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
  },
  
  // Spacing utilities
  responsiveSpacing: {
    padding: { xs: '0.5rem', sm: '1rem', md: '1.5rem' },
    margin: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' },
  },
  
  // Container utilities
  responsiveContainer: {
    maxWidth: { xs: '100%', sm: '768px', md: '1200px' },
    padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
  },
  
  // Flexbox utilities
  responsiveFlex: {
    flexDirection: { xs: 'column', sm: 'row' },
  },
  
  // Grid utilities
  responsiveGrid: {
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
    },
  },
} as const;