import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBudget, deleteBudget } from "../api/budget";

export const useAddBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBudget,
    onMutate: async (newBudgetData) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const previousBudgetData = queryClient.getQueryData(["budgets"]);

      queryClient.setQueryData(["budgets"], (old = []) => [
        ...old,
        {
          ...newBudgetData,
          budget_id: Date.now(),
          amount: Number(newBudgetData.amount) || 0,
          description: newBudgetData.description || "",
        },
      ]);

      return { previousBudgetData };
    },
    onError: (err, newBudgetData, context) => {
      if (context?.previousBudgetData) {
        queryClient.setQueryData(["budgets"], context.previousBudgetData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBudget,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["budgets"] });
      const previousBudgets = queryClient.getQueryData(["budgets"]);

      queryClient.setQueryData(["budgets"], (old = []) =>
        old.filter((budget) => budget.budget_id !== id)
      );

      return { previousBudgets };
    },
    onError: (err, id, context) => {
      if (context?.previousBudgets) {
        queryClient.setQueryData(["budgets"], context.previousBudgets);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};
