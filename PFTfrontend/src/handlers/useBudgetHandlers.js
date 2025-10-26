import { useState } from "react";
import Swal from "sweetalert2";
import { useAddBudget, useDeleteBudget } from "../queries/budgetQueries";
import { useBudgetHooks } from "../hooks/useBudgetHooks";

export const useBudgetHandlers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const addBudgetMutation = useAddBudget();
  const deleteBudgetMutation = useDeleteBudget();

  const { budgets, MAX_BUDGETS } = useBudgetHooks();

  const handleOpenModal = (type, budget = null) => {
    if (!budget && budgets.length >= MAX_BUDGETS) {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: `You can only create up to ${MAX_BUDGETS} budgets.`,
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    setModalType(type);

    if (budget) {
      setEditingId(budget.budget_id);
      setFormData({
        name: budget.name || "",
        category: budget.category ?? "",
        amount: safeNumber(budget.allocated),
        start_date: budget.start_date || "",
        end_date: budget.end_date || "",
        description: budget.description || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        category: "",
        amount: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    }

    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const isFormValid = () => {
    switch (modalType) {
      case "income":
      case "expense":
        return (
          formData.name?.trim() &&
          formData.category?.trim() &&
          Number(formData.amount) > 0 &&
          formData.transaction_date
        );
      case "budget":
        return (
          formData.name?.trim() &&
          formData.category?.trim() &&
          Number(formData.amount) > 0 &&
          formData.start_date &&
          formData.end_date
        );
      case "goal":
        return (
          formData.title?.trim() &&
          Number(formData.target_amount) > 0 &&
          formData.deadline
        );
      default:
        return false;
    }
  };

  const preparePayload = () => {
    if (modalType === "income" || modalType === "expense") {
      return {
        type: modalType,
        name: formData.name,
        category: formData.category,
        amount: Number(formData.amount),
        transaction_date: formData.transaction_date,
        description: formData.description || "",
        editingId: editingId || null,
      };
    }
    if (modalType === "budget") {
      return {
        type: modalType,
        name: formData.name,
        category: formData.category,
        amount: Number(formData.amount),
        start_date: formData.start_date,
        end_date: formData.end_date,
        description: formData.description || "",
        editingId: editingId || null,
      };
    }
    if (modalType === "goal") {
      return {
        title: formData.title,
        target_amount: Number(formData.target_amount),
        deadline: formData.deadline,
        description: formData.description || "",
        editingId: editingId || null,
      };
    }
    return {};
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!isFormValid()) return;

    setLoading(true);

    try {
      const payload = preparePayload();

      const bgData = {
        type: payload.type,
        name: payload.name,
        category: payload.category,
        amount: Number(payload.amount),
        start_date: payload.start_date,
        end_date: payload.end_date,
        description: payload.description || "",
      };

      if (editingId) {
        await updateTransactionMutation.mutateAsync({
          id: editingId,
          data: bgData,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Transaction updated!",
          confirmButtonColor: "#10B981",
        });
      } else {
        await addBudgetMutation.mutateAsync(bgData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Budget Added!",
          confirmButtonColor: "#10B981",
        });
      }

      setModalOpen(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join("\n")
          : err.message || "Something went wrong. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: errorMessage,
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (budget) => {
    Swal.fire({
      title: `Delete ${budget.category}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBudgetMutation.mutateAsync(budget.id);

          Swal.fire(
            "Deleted!",
            `${budget.category} budget has been deleted.`,
            "success"
          ).then(() => {
            setBudgetModalOpen(false);
          });
        } catch (error) {
          Swal.fire("Error", "Failed to delete budget.", "error");
        }
      }
    });
  };

  return {
    modalOpen,
    modalType,
    formData,
    editingId,
    loading,
    handleOpenModal,
    handleCloseModal,
    isFormValid,
    setFormData,
    handleSubmit,
    handleDelete,
  };
};
