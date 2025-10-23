import { useTransactions } from "../queries/fetchQueries";

export const useTransactionHooks = (filterType = "all", searchText = "") => {
  const { data: transactions = [] } = useTransactions();

  const filteredTransactions = (transactions || []).filter((tx) => {
    const typeMatch =
      filterType === "all" ? true : tx.type?.toLowerCase() === filterType;
    const descMatch = tx.name?.toLowerCase().includes(searchText.toLowerCase());
    return typeMatch && descMatch;
  });

  // ================= Totals =================
  const totalIncome = (transactions || [])
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpenses = (transactions || [])
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return {
    transactions,
    filteredTransactions,
    totalIncome,
    totalExpenses,
    netBalance,
  };
};
