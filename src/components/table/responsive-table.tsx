import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useIsMobile } from '@/hooks/use-mobile';

// ----------------------------------------------------------------------

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: unknown) => string;
  hideOnMobile?: boolean;
}

interface ResponsiveTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  onRowClick?: (row: Record<string, unknown>) => void;
  emptyMessage?: string;
  stickyHeader?: boolean;
}

// ----------------------------------------------------------------------

export default function ResponsiveTable({
  columns,
  rows,
  onRowClick,
  emptyMessage = 'Nenhum dado encontrado',
  stickyHeader = true,
}: ResponsiveTableProps) {
  const theme = useTheme();
  const isMobile = useIsMobile();
  
  // Filter columns for mobile view
  const visibleColumns = isMobile 
    ? columns.filter(column => !column.hideOnMobile)
    : columns;

  if (rows.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  // Mobile card view
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {rows.map((row, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              cursor: onRowClick ? 'pointer' : 'default',
              '&:hover': onRowClick ? {
                backgroundColor: theme.palette.action.hover,
              } : {},
            }}
            onClick={() => onRowClick?.(row)}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              {visibleColumns.map((column, colIndex) => (
                <Box key={column.id}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: colIndex === visibleColumns.length - 1 ? 0 : 1
                  }}>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontWeight: 600, minWidth: '40%' }}
                    >
                      {column.label}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        textAlign: column.align || 'left',
                        flex: 1,
                        ml: 1,
                        wordBreak: 'break-word',
                      }}
                    >
                      {column.format 
                        ? column.format(row[column.id]) 
                        : String(row[column.id] ?? '')
                      }
                    </Typography>
                  </Box>
                  {colIndex < visibleColumns.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Desktop table view
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        maxHeight: '70vh',
        '& .MuiTableCell-root': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Table stickyHeader={stickyHeader} aria-label="responsive table">
        <TableHead>
          <TableRow>
            {visibleColumns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ 
                  minWidth: column.minWidth,
                  backgroundColor: theme.palette.background.paper,
                  fontWeight: 600,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              hover={!!onRowClick}
              role={onRowClick ? "checkbox" : undefined}
              tabIndex={-1}
              key={index}
              onClick={() => onRowClick?.(row)}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': onRowClick ? {
                  backgroundColor: theme.palette.action.hover,
                } : {},
              }}
            >
              {visibleColumns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell 
                    key={column.id} 
                    align={column.align}
                    sx={{ 
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column.format 
                      ? column.format(value) 
                      : String(value ?? '')
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
