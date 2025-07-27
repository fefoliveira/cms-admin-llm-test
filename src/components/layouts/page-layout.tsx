import { ReactNode } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  useTheme, 
  alpha,
  Card,
  CardContent,
  Stack,
  Breadcrumbs,
  Link,
  SxProps,
  Theme,
} from '@mui/material';

// ----------------------------------------------------------------------

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    name: string;
    href?: string;
  }>;
  action?: ReactNode;
}

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
}

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  trend?: {
    value: number;
    label: string;
    isUpward?: boolean;
  };
  sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

export function PageHeader({ title, subtitle, breadcrumbs, action }: PageHeaderProps) {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && (
        <Breadcrumbs sx={{ mb: 2 }}>
          {breadcrumbs.map((crumb, index) => (
            <Link 
              key={index}
              color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
              href={crumb.href}
              underline="hover"
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: index === breadcrumbs.length - 1 ? 600 : 400,
              }}
            >
              {crumb.name}
            </Link>
          ))}
        </Breadcrumbs>
      )}
      
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: subtitle ? 1 : 0,
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {action && (
          <Box sx={{ flexShrink: 0 }}>
            {action}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export function PageContainer({ 
  children, 
  maxWidth = 'xl', 
  disableGutters = false 
}: PageContainerProps) {
  return (
    <Container 
      maxWidth={maxWidth} 
      disableGutters={disableGutters}
      sx={{ 
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },
      }}
    >
      {children}
    </Container>
  );
}

export function DashboardCard({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  trend,
  sx = {},
}: DashboardCardProps) {
  const theme = useTheme();
  
  const colorConfig = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    success: theme.palette.success,
    warning: theme.palette.warning,
    error: theme.palette.error,
    info: theme.palette.info,
  };

  const selectedColor = colorConfig[color];

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        transition: theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          boxShadow: theme.shadows[8],
        },
        ...sx,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 1, 
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              {value}
            </Typography>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            {trend && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: trend.isUpward !== false 
                      ? theme.palette.success.main 
                      : theme.palette.error.main,
                    fontWeight: 600,
                  }}
                >
                  {trend.isUpward !== false ? '+' : ''}{trend.value}%
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {trend.label}
                </Typography>
              </Stack>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(selectedColor.main, 0.08),
                color: selectedColor.main,
              }}
            >
              {icon}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
