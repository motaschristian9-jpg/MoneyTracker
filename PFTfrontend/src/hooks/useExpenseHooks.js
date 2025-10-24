import { useTransactions } from "../queries/fetchQueries";

export const useExpenseHooks = (
  search = "",
  dateFilter = "This Month",
  customStart = "",
  customEnd = "",
  categoryFilter = "All Categories"
) => {
  const { data: transactions = [] } = useTransactions();

  const expenseTransactions = transactions.filter(
    (t) => t.type?.toLowerCase() === "expense"
  );

  const filteredExpenses = expenseTransactions.filter((tx) => {
    // Ensure tx.description is a string before calling toLowerCase()
    const description = tx.name;
    const descMatch = description.toLowerCase().includes(search.toLowerCase());

    let dateMatch = true;
    const txDate = new Date(tx.transaction_date);

    if (dateFilter === "This Month") {
      const now = new Date();
      dateMatch =
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear();
    } else if (dateFilter === "Last Month") {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      dateMatch =
        txDate.getMonth() === lastMonth.getMonth() &&
        txDate.getFullYear() === lastMonth.getFullYear();
    } else if (dateFilter === "Custom Range" && customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd);
      dateMatch = txDate >= start && txDate <= end;
    }

    let categoryMatch = true;
    if (categoryFilter !== "All Categories") {
      categoryMatch = tx.category === categoryFilter;
    }

    return descMatch && dateMatch && categoryMatch;
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );

  const largestCategory =
    filteredExpenses.length > 0
      ? filteredExpenses.reduce((max, tx) =>
          Number(tx.amount) > Number(max.amount) ? tx : max
        ).category
      : "—";

  const avgMonthlyExpenses =
    totalExpenses /
      new Set(
        filteredExpenses.map((tx) => new Date(tx.transaction_date).getMonth())
      ).size || 0;

  return {
    filteredExpenses,
    totalExpenses,
    largestCategory,
    avgMonthlyExpenses,
  };
};
