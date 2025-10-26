import { useMemo } from "react";
import { useBudgets, useTransactions } from "../queries/fetchQueries";

export const useBudgetHooks = () => {
  const { data: budgets = [] } = useBudgets();
  const { data: transactions = [] } = useTransactions();

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
  const MAX_BUDGETS = 9;

  const safeNumber = (n) => (typeof n === "number" ? n : 0);

  const budgetSpent = (budgetId) => {
    return transactions
      .filter((tx) => tx.budget_id === budgetId)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  };

  const getBudgetStatus = (budget) => {
    const allocated = Number(budget.amount || 0);
    const spent = budgetSpent(budget.budget_id);
    const remaining = allocated - spent;

    // Check if budget is completed (spent >= allocated)
    if (spent >= allocated) return "Completed";

    // Check if behind schedule (end_date passed)
    const now = new Date();
    const endDate = budget.end_date ? new Date(budget.end_date) : null;
    if (endDate && now > endDate && remaining > 0) return "Behind";

    return "On Track";
  };

  const chartData = useMemo(() => {
    return budgets
      .filter((b) => Number(b.amount) > 0)
      .map((b) => ({
        category: b.category,
        allocated: Number(b.amount),
        spent: transactions
          .filter((tx) => tx.budget_id === b.budget_id)
          .reduce((sum, tx) => sum + Number(tx.amount), 0),
      }));
  }, [budgets, transactions]);

  const totalAllocated = budgets.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );
  const totalSpent = budgets.reduce(
    (sum, b) => sum + budgetSpent(b.budget_id),
    0
  );
  const totalRemaining = totalAllocated - totalSpent;
  const completedBudgetCount = budgets.filter(
    (b) => getBudgetStatus(b) === "Completed"
  ).length;

  return {
    budgets,
    COLORS,
    MAX_BUDGETS,
    chartData,
    totalAllocated,
    totalSpent,
    totalRemaining,
    completedBudgetCount,
    budgetSpent,
    getBudgetStatus,
    safeNumber,
  };
};
