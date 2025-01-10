import useTransactionStore from "@/store/transaction/transaction";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateTransactionFormValues,
  updateTransactionRequestSchema,
} from "@/schemas";
import { z } from "zod";
import useModalTransaction from "@/store/transaction/modal";

export default function useUpdateTransaction() {
  const {
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
    editTransactionId,
  } = useModalTransaction();

  const {
    updateTransaction,
    setLoadingUpdateTransaction,
    loadingUpdateTransaction,
    setErrorUpdateTransaction,
  } = useTransactionStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: UpdateTransactionFormValues) => {
    setLoadingUpdateTransaction(true);

    try {
      const validatedValues = updateTransactionRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await updateTransaction(
        editTransactionId as number,
        validatedValues,
      );

      if (result) {
        toast({
          title: "Success",
          description: "User berhasil diupdate",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat user. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorUpdateTransaction(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorUpdateTransaction(
          error?.message || "Terjadi kesalahan saat mengedit user",
        );
        toast({
          title: "Error",
          description: error?.message || "Terjadi kesalahan saat mengedit user",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingUpdateTransaction(false);
      hideModalEdit();
    }
  };

  return {
    handleSubmit,
    loadingUpdateTransaction,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  };
}
