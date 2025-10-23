import { useTransactions } from "../queries/fetchQueries";

export const useIncomeHooks = (search = "", dateFilter = "This Month", customStart = "", customEnd = "", sourceFilter = "All Sources") => {
  const { data: transactions = [] } = useTransactions();

  const incomeTransactions = transactions.filter(
    (t) => t.type?.toLowerCase() === "income"
  );

  const filteredIncome = incomeTransactions.filter((tx) => {
    const descMatch = tx.description
      ?.toLowerCase()
      .includes(search.toLowerCase());

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

    let sourceMatch = true;
    if (sourceFilter !== "All Sources") {
      if (sourceFilter === "Others") {
        const mainSources = ["Salary", "Freelance", "Investments", "Business"];
        sourceMatch = !mainSources.includes(tx.category);
      } else {
        sourceMatch = tx.category === sourceFilter;
      }
    }

    return descMatch && dateMatch && sourceMatch;
  });

  const totalIncome = filteredIncome.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );

  const highestSource =
    filteredIncome.length > 0
      ? filteredIncome.reduce((max, tx) =>
          Number(tx.amount) > Number(max.amount) ? tx : max
        ).category
      : "—";

  const avgMonthlyIncome =
    totalIncome /
      new Set(
        filteredIncome.map((tx) => new Date(tx.transaction_date).getMonth())
      ).size || 0;

  return {
    filteredIncome,
    totalIncome,
    highestSource,
    avgMonthlyIncome,
    search,
  };
};
