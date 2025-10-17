import { useQuery } from "@tanstack/react-query";
import {
  fetchProfile,
  fetchTransactions,
  fetchBudgets,
  fetchSavings, 
} from "../api/fetch"; // adjust path if needed

// Reusable custom hook
const useFetch = (key, fetchFn, defaultValue = []) => {
  const queryResult = useQuery({
    queryKey: [key],
    queryFn: fetchFn,
    refetchOnWindowFocus: false,
  });

  return {
    ...queryResult,
    data: queryResult.data ?? defaultValue,
  };
};

// Feature-specific hooks
export const useProfile = () => useFetch("profile", fetchProfile, {});

export const useTransactions = () => useFetch("transactions", fetchTransactions, []);

export const useBudgets = () => useFetch("budgets", fetchBudgets, []);

export const useSavings = () => useFetch("savings", fetchSavings, []);
