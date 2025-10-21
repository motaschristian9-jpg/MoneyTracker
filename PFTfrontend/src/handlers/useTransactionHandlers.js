import { useState } from "react";
import Swal from "sweetalert2";

export const useTransactionHandlers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (type, transaction = null) => {
    setModalType(type);

    if (transaction) {
      setEditingId(transaction.id);
      setFormData({
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description || "",
        transaction_date: transaction.transaction_date,
      });
    } else {
      setEditingId(null);
      setFormData({
        category: "",
        amount: "",
        description: "",
        transac_date: "",
        title: "",
        target_amount: "",
        deadline: "",
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
          formData.category?.trim() &&
          Number(formData.amount) > 0 &&
          formData.transaction_date
        );
      case "budget":
        if (selectedBudget && expenseAmount) return Number(expenseAmount) > 0;
        return (
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
        category: formData.category,
        amount: Number(formData.amount),
        transaction_date: formData.transaction_date,
        description: formData.description || "",
        editingId: editingId || null,
      };
    }
    if (modalType === "budget") {
      if (selectedBudget && expenseAmount) {
        return {
          budget_id: selectedBudget.budget_id,
          amount: Number(expenseAmount),
        };
      }
      return {
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

      const txData = {
        type: modalType === "income" ? "income" : "expense",
        category: payload.category,
        amount: Number(payload.amount),
        transaction_date: payload.transaction_date,
        description: payload.description || "",
      };

      if (editingId) {
        await updateTransactionMutation.mutateAsync({
          id: editingId,
          data: txData,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Transaction updated!",
          confirmButtonColor: "#10B981",
        });
      } else {
        await addTransactionMutation.mutateAsync(txData);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: modalType === "income" ? "Income added!" : "Expense added!",
          confirmButtonColor: "#10B981",
        });
      }

      setModalOpen(false);
      if (expenseAmount) expenseAmount("");
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

  return {
    modalOpen,
    modalType,
    formData,
    editingId,
    loading,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    isFormValid,
    setFormData,
  };
};
