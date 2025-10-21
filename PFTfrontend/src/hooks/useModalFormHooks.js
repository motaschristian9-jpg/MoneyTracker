import { Target, TrendingUp, TrendingDown, FileText } from "lucide-react";

export const useModalFormHooks = (modalType, editingId) => {
  const expenseCategories = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
    "Other",
  ];
  const incomeCategories = [
    "Salary",
    "Business",
    "Investments",
    "Freelancing",
    "Gifts",
    "Other",
  ];

  const getModalConfig = () => {
    switch (modalType) {
      case "income":
        return {
          title: editingId ? "Edit Income" : "Add Income",
          icon: TrendingUp,
          color: "green",
          gradient: "from-green-500 to-green-600",
          borderColor: "border-green-100/50",
          bgGradient: "from-green-200/30 to-green-300/20",
        };
      case "expense":
        return {
          title: editingId ? "Edit Expense" : "Add Expense",
          icon: TrendingDown,
          color: "red",
          gradient: "from-red-500 to-red-600",
          borderColor: "border-red-100/50",
          bgGradient: "from-red-200/30 to-red-300/20",
        };
      case "budget":
        return {
          title: selectedBudget
            ? `Budget: ${selectedBudget.category}`
            : editingId
            ? "Edit Budget"
            : "Add Budget",
          icon: Target,
          color: "blue",
          gradient: "from-blue-500 to-blue-600",
          borderColor: "border-blue-100/50",
          bgGradient: "from-blue-200/30 to-blue-300/20",
        };
      case "goal":
        return {
          title: editingId ? "Edit Goal" : "Add Goal",
          icon: Target,
          color: "purple",
          gradient: "from-purple-500 to-purple-600",
          borderColor: "border-purple-100/50",
          bgGradient: "from-purple-200/30 to-purple-300/20",
        };
      default:
        return {
          title: "Form",
          icon: FileText,
          color: "gray",
          gradient: "from-gray-500 to-gray-600",
          borderColor: "border-gray-100/50",
          bgGradient: "from-gray-200/30 to-gray-300/20",
        };
    }
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  return { config, IconComponent, expenseCategories, incomeCategories };
};
