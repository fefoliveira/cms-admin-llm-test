import { useEffect } from 'react';
import { useRulesStore } from 'src/store/rules.store';

// ----------------------------------------------------------------------

export function useRules() {
  const {
    rules,
    loading,
    error,
    order,
    orderBy,
    page,
    rowsPerPage,
    dense,
    fetchRules,
    createRule,
    updateRule,
    inactivateRule,
    setOrder,
    setOrderBy,
    setPage,
    setRowsPerPage,
    setDense,
  } = useRulesStore();

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

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
    rules,
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
    createRule,
    updateRule,
    inactivateRule,
    fetchRules,
  };
}