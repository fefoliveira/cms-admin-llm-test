import { useState, useCallback, useMemo } from "react";
import { useVariablesStore } from "@/store/variables.store";
import { Variable } from "@/types/variables";
import { getComparator, stableSort } from "@/utils/sorting";

export interface VariablesTableProps {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (property: string) => void;
  data: Variable[];
  loading: boolean;
  error: string | null;
}

export function useVariablesTable(): VariablesTableProps {
  const { variables, loading, error } = useVariablesStore();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");

  const handleRequestSort = useCallback(
    (property: string) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const sortedVariables = useMemo(() => {
    if (!variables) return [];
    return stableSort(
      variables,
      getComparator(order, orderBy as keyof Variable)
    );
  }, [variables, order, orderBy]);

  return {
    order,
    orderBy,
    onRequestSort: handleRequestSort,
    data: sortedVariables,
    loading,
    error,
  };
}
