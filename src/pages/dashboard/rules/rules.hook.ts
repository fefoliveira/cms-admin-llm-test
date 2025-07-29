import { useEffect } from "react";
import { useRulesStore } from "@/store/rules.store";
import { getComparator, stableSort } from "@/utils/sorting";
import { Rule } from "@/types/rules";

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
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Apply sorting to rules
  const sortedRules = stableSort(
    rules,
    getComparator(order, orderBy as keyof Rule)
  );

  return {
    rules: sortedRules,
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
