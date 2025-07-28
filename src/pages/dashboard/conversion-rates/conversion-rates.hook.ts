import { useEffect } from 'react';
import { useConversionRatesStore } from 'src/store/conversionRates.store';

// ----------------------------------------------------------------------

export function useConversionRates() {
  const {
    conversionRates,
    loading,
    error,
    order,
    orderBy,
    page,
    rowsPerPage,
    dense,
    fetchConversionRates,
    createConversionRate,
    updateConversionRate,
    inactivateConversionRate,
    activateConversionRate,
    setOrder,
    setOrderBy,
    setPage,
    setRowsPerPage,
    setDense,
  } = useConversionRatesStore();

  useEffect(() => {
    fetchConversionRates();
  }, [fetchConversionRates]);

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return {
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
    createConversionRate,
    updateConversionRate,
    inactivateConversionRate,
    activateConversionRate,
    fetchConversionRates,
  };
}