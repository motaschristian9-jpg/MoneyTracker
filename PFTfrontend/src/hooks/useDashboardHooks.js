import {
  useProfile,
  useTransactions,
  useBudgets,
  useSavings,
} from "../queries/fetchQueries.js";

export const useDashboardHooks = () => {
  const { data: profile = {} } = useProfile();
  const { data: transactions = [] } = useTransactions();
  const { data: budgets = [] } = useBudgets();
  const { data: savings = [] } = useSavings();

  // --- Helper calculations ---
  const budgetSpent = (budgetId) => {
    return transactions
      .filter((tx) => tx.budget_id === budgetId)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  };

  const totalIncome = transactions
    .filter((t) => t.type?.toLowerCase() === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  const totalTarget = savings.reduce(
    (acc, goal) => acc + Number(goal.target_amount || 0),
    0
  );

  // Sum of all contributions from all goals
  const totalSaved = savings.reduce((acc, goal) => {
    const goalTotal = (goal.contributions || []).reduce(
      (sum, c) => sum + Number(c.amount || 0),
      0
    );
    return acc + goalTotal;
  }, 0);

  const expenseData = transactions
    .filter((t) => t.type?.toLowerCase() === "expense")
    .reduce((acc, tx) => {
      const existing = acc.find((item) => item.name === tx.category);
      if (existing) existing.value += parseFloat(tx.amount);
      else acc.push({ name: tx.category, value: parseFloat(tx.amount) });
      return acc;
    }, []);

  const incomeExpenseData = transactions
    ? [
        {
          month: new Date().toLocaleString("default", { month: "long" }),
          income: totalIncome,
          expenses: totalExpenses,
        },
      ]
    : [];

  const savingsProgress =
    totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];
  const MAX_ITEMS = 9;

  return {
    profile,
    transactions,
    budgets,
    savings,
    budgetSpent,
    totalIncome,
    totalExpenses,
    netBalance,
    totalTarget,
    totalSaved,
    COLORS,
    MAX_ITEMS,
    expenseData,
    incomeExpenseData,
    savingsProgress,
  };
};
