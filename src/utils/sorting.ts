export function getComparator<T>(
  order: "asc" | "desc",
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  // Handle null/undefined values
  if (bValue == null && aValue == null) return 0;
  if (bValue == null) return -1;
  if (aValue == null) return 1;

  // Handle string comparison
  if (typeof aValue === "string" && typeof bValue === "string") {
    return bValue.localeCompare(aValue);
  }

  // Handle date comparison
  if (aValue instanceof Date && bValue instanceof Date) {
    return bValue.getTime() - aValue.getTime();
  }

  // Handle number comparison and general comparison
  if (bValue < aValue) return -1;
  if (bValue > aValue) return 1;
  return 0;
}

export function stableSort<T>(
  array: readonly T[],
  compareFn: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = compareFn(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
