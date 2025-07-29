import { ReactNode } from "react";
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
  Card,
  CardContent,
  Stack,
  Chip,
  alpha,
  TableSortLabel,
} from "@mui/material";
import { useIsMobile } from "@/hooks/use-mobile";

// ----------------------------------------------------------------------

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: unknown) => string;
  hideOnMobile?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

interface ResponsiveTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  onRowClick?: (row: Record<string, unknown>) => void;
  emptyMessage?: string;
  stickyHeader?: boolean;
  elevation?: number;
  // Sorting props
  order?: "asc" | "desc";
  orderBy?: string;
  onRequestSort?: (property: string) => void;
}

// ----------------------------------------------------------------------

export default function ResponsiveTable({
  columns,
  rows,
  onRowClick,
  emptyMessage = "Nenhum dado encontrado",
  stickyHeader = true,
  elevation = 0,
  order,
  orderBy,
  onRequestSort,
}: ResponsiveTableProps) {
  const theme = useTheme();
  const isMobile = useIsMobile();

  // Filter columns for mobile view
  const visibleColumns = isMobile
    ? columns.filter((column) => !column.hideOnMobile)
    : columns;

  if (rows.length === 0) {
    return (
      <Paper
        elevation={elevation}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          {emptyMessage}
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Não há dados para exibir no momento
        </Typography>
      </Paper>
    );
  }

  // Mobile card view
  if (isMobile) {
    return (
      <Stack spacing={2}>
        {rows.map((row, index) => (
          <Card
            key={index}
            elevation={elevation}
            sx={{
              cursor: onRowClick ? "pointer" : "default",
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
              transition: theme.transitions.create(
                ["box-shadow", "transform"],
                {
                  duration: theme.transitions.duration.shorter,
                }
              ),
              "&:hover": onRowClick
                ? {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-2px)",
                  }
                : {},
            }}
            onClick={() => onRowClick?.(row)}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2}>
                {visibleColumns.map((column, colIndex) => (
                  <Box key={column.id}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{
                          fontWeight: 600,
                          minWidth: "40%",
                          fontSize: "0.875rem",
                        }}
                      >
                        {column.label}
                      </Typography>
                      <Box sx={{ flex: 1, textAlign: column.align || "left" }}>
                        {column.render ? (
                          column.render(row[column.id], row)
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: theme.palette.text.primary,
                              wordBreak: "break-word",
                            }}
                          >
                            {column.format
                              ? column.format(row[column.id])
                              : String(row[column.id] ?? "")}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                    {colIndex < visibleColumns.length - 1 && (
                      <Box
                        sx={{
                          mt: 2,
                          mb: 1,
                          height: 1,
                          backgroundColor: alpha(theme.palette.grey[500], 0.08),
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  // Desktop table view
  return (
    <Paper
      elevation={elevation}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
      }}
    >
      <TableContainer
        sx={{
          maxHeight: "70vh",
          "&::-webkit-scrollbar": {
            width: 6,
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: alpha(theme.palette.grey[500], 0.05),
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.grey[500], 0.3),
            borderRadius: 3,
            "&:hover": {
              backgroundColor: alpha(theme.palette.grey[500], 0.5),
            },
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
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: alpha(theme.palette.grey[50], 0.8),
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: theme.palette.text.primary,
                    borderBottom: `2px solid ${alpha(
                      theme.palette.grey[500],
                      0.08
                    )}`,
                    py: 2,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {onRequestSort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => onRequestSort(column.id)}
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          color: "inherit !important",
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
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
                  cursor: onRowClick ? "pointer" : "default",
                  transition: theme.transitions.create(["background-color"], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  "&:hover": onRowClick
                    ? {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.04
                        ),
                      }
                    : {},
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                }}
              >
                {visibleColumns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        py: 2,
                        px: 2,
                        borderBottom: `1px solid ${alpha(
                          theme.palette.grey[500],
                          0.08
                        )}`,
                        fontSize: "0.875rem",
                        fontWeight: 500,
                      }}
                    >
                      {column.render
                        ? column.render(value, row)
                        : column.format
                        ? column.format(value)
                        : String(value ?? "")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
