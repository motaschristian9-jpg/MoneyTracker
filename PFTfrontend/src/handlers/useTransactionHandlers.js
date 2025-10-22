import { useState } from "react";
import Swal from "sweetalert2";
import { useAddTransaction, useUpdateTransaction, useDeleteTransaction } from "../queries/transactionQueries";

export const useTransactionHandlers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const addTransactionMutation = useAddTransaction();
  const updateTransactionMutation = useUpdateTransaction();
  const deleteTransactionMutation = useDeleteTransaction();

  const handleOpenModal = (type, transaction = null) => {
    setModalType(type);

    if (transaction) {
      setEditingId(transaction.id);
      setFormData({
        name: transaction.name,
        category: transaction.category,
        amount: transaction.amount,
        description: transaction.description || "",
        transaction_date: transaction.transaction_date,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
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
          formData.name?.trim() &&
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
        name: formData.name,
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
        name: payload.name,
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

  const handleDelete = (txId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#10B981",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransactionMutation.mutateAsync(txId, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Transaction has been deleted.", "success");
          },
          onError: (error) => {
            Swal.fire(
              "Error!",
              error.response?.data?.message || "Failed to delete transaction.",
              "error"
            );
          },
        });
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
    handleSubmit,
    handleDelete,
    isFormValid,
    setFormData,
  };
};
