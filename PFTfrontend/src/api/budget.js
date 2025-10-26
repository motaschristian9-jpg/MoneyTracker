import api from "./index";

export const addBudget = (budgetData) =>
  api.post("/budgets", {
    name: budgetData.name,
    category: budgetData.category,
    target_amount: Number(budgetData.amount),
    start_date: budgetData.start_date,
    end_date: budgetData.end_date,
    description: budgetData.description || "",
  });

export const deleteBudget = (id) => api.delete(`/budgets/${id}`);
