import React from 'react';
import {
  Card,
  Table,
  Button,
  Container,
  TableBody,
  TableContainer,
  Typography,
  TablePagination,
  FormControlLabel,
  Switch,
  Box,
  Stack,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { useSettings } from 'src/components/settings/use-settings';

import { ConversionRate } from 'src/types/conversion-rate';

import { useConversionRates } from './conversion-rates.hook';

// ----------------------------------------------------------------------

export default function ConversionRatesView() {
  const settings = useSettings();

  const {
    conversionRates,
    loading,
    error,
    order,
    orderBy,
    page,
    rowsPerPage,
    dense,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
    inactivateConversionRate,
    activateConversionRate,
  } = useConversionRates();

  if (loading) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Typography color="error">Erro: {error}</Typography>
      </Container>
    );
  }

  const handleStatusToggle = (rate: ConversionRate) => {
    if (rate.status === 'active') {
      inactivateConversionRate(rate.id);
    } else {
      activateConversionRate(rate.id);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h4">Taxas de Conversão</Typography>
        <Button variant="contained" color="inherit">
          Nova Taxa de Conversão
        </Button>
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Nome
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'rate'}
                    direction={orderBy === 'rate' ? order : 'asc'}
                    onClick={() => handleSort('rate')}
                  >
                    Taxa
                  </TableSortLabel>
                </TableCell>
                <TableCell>Padrão</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Período</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'createdBy'}
                    direction={orderBy === 'createdBy' ? order : 'asc'}
                    onClick={() => handleSort('createdBy')}
                  >
                    Criado por
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {conversionRates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rate) => (
                  <TableRow hover key={rate.id}>
                    <TableCell>{rate.name}</TableCell>
                    <TableCell>{rate.rate.toFixed(3)}</TableCell>
                    <TableCell>
                      {rate.default && (
                        <Chip label="Padrão" color="primary" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={rate.status === 'active' ? 'Ativo' : 'Inativo'}
                        color={rate.status === 'active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {rate.startDate.toLocaleDateString('pt-BR')} - {rate.endDate.toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{rate.createdBy}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={rate.status === 'active' ? 'Inativar' : 'Ativar'}>
                        <IconButton onClick={() => handleStatusToggle(rate)}>
                          {rate.status === 'active' ? <DeleteIcon /> : <PlayArrowIcon />}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={conversionRates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Compacto"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </Container>
  );
}