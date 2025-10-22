import api from "./index";

export const addTransaction = (txData) =>
  api.post("/transactions", {
    type: txData.type?.toLowerCase() === "income" ? "Income" : "Expense",
    name: txData.name,
    category: txData.category,
    amount: Number(txData.amount),
    transaction_date: txData.transaction_date,
    description: txData.description || "",
  });

export const updateTransaction = (id, data) =>
  api.put(`transactions/${id}`, data);

export const deleteTransaction = (id) => api.delete(`transactions/${id}`);
