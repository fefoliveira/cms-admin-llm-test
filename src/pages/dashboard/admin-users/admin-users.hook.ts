import { useState, useCallback, useMemo } from "react";
import { useAdminUsersStore } from "@/store/adminUsers.store";
import { AdminUser } from "@/types/admin-user";
import { getComparator, stableSort } from "@/utils/sorting";

export interface AdminUsersTableProps {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (property: string) => void;
  data: AdminUser[];
  loading: boolean;
}

export function useAdminUsersTable(): AdminUsersTableProps {
  const { adminUsers, loading } = useAdminUsersStore();
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

  const sortedAdminUsers = useMemo(() => {
    if (!adminUsers) return [];
    return stableSort(
      adminUsers,
      getComparator(order, orderBy as keyof AdminUser)
    );
  }, [adminUsers, order, orderBy]);

  return {
    order,
    orderBy,
    onRequestSort: handleRequestSort,
    data: sortedAdminUsers,
    loading,
  };
}
