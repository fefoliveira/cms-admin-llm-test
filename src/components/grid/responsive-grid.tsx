import { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

// ----------------------------------------------------------------------

interface ResponsiveGridProps {
  children: ReactNode;
  spacing?: number;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  minItemWidth?: number;
  maxColumns?: number;
}

// ----------------------------------------------------------------------

export default function ResponsiveGrid({
  children,
  spacing = 3,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  minItemWidth = 280,
  maxColumns = 4,
}: ResponsiveGridProps) {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Auto-calculate columns based on screen size
  const getColumns = () => {
    if (isMobile) return columns.xs || 1;
    if (isTablet) return columns.sm || 2;
    return columns.lg || maxColumns;
  };

  const currentColumns = getColumns();
  const gap = spacing * 8; // Convert spacing to pixels

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%',
        // Responsive grid template columns
        [theme.breakpoints.only('xs')]: {
          gridTemplateColumns: `repeat(${columns.xs || 1}, 1fr)`,
        },
        [theme.breakpoints.only('sm')]: {
          gridTemplateColumns: `repeat(${columns.sm || 2}, 1fr)`,
        },
        [theme.breakpoints.only('md')]: {
          gridTemplateColumns: `repeat(${columns.md || 3}, 1fr)`,
        },
        [theme.breakpoints.up('lg')]: {
          gridTemplateColumns: `repeat(${columns.lg || maxColumns}, 1fr)`,
        },
      }}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

// Helper component for responsive card layouts
interface ResponsiveCardGridProps {
  children: ReactNode;
  spacing?: number;
  minCardWidth?: number;
  maxColumns?: number;
}

export function ResponsiveCardGrid({
  children,
  spacing = 2,
  minCardWidth = 300,
  maxColumns = 3,
}: ResponsiveCardGridProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gap: `${spacing * 8}px`,
        gridTemplateColumns: {
          xs: '1fr',
          sm: `repeat(${Math.min(2, maxColumns)}, 1fr)`,
          md: `repeat(${Math.min(3, maxColumns)}, 1fr)`,
          lg: `repeat(${maxColumns}, 1fr)`,
        },
        // Auto-fit approach for better responsiveness
        [theme.breakpoints.up('md')]: {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`,
        },
      }}
    >
      {children}
    </Box>
  );
}
