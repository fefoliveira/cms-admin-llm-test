import { useState, useCallback, useMemo } from "react";
import { useAdminLogsStore } from "@/store/adminLogs.store";
import { AdminLog } from "@/types/admin-logs";
import { getComparator, stableSort } from "@/utils/sorting";

export interface AdminLogsTableProps {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (property: string) => void;
  data: AdminLog[];
  loading: boolean;
  error: string | null;
}

export function useAdminLogsTable(): AdminLogsTableProps {
  const { adminLogs, loading, error } = useAdminLogsStore();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("timestamp");

  const handleRequestSort = useCallback(
    (property: string) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const sortedAdminLogs = useMemo(() => {
    if (!adminLogs) return [];
    return stableSort(
      adminLogs,
      getComparator(order, orderBy as keyof AdminLog)
    );
  }, [adminLogs, order, orderBy]);

  return {
    order,
    orderBy,
    onRequestSort: handleRequestSort,
    data: sortedAdminLogs,
    loading,
    error,
  };
}
