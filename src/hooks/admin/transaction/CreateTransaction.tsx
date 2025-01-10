import useTransactionStore from "@/store/transaction/transaction";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  CreateTransactionFormValues,
  createTransactionRequestSchema,
} from "@/schemas";
import { z } from "zod";
import useModalTransaction from "@/store/transaction/modal";

export default function useCreateTransaction() {
  const { isModalVisible, showModal, hideModal } = useModalTransaction();

  const {
    createTransaction,
    setLoadingCreateTransaction,
    loadingCreateTransaction,
    setErrorCreateTransaction,
  } = useTransactionStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateTransactionFormValues) => {
    setLoadingCreateTransaction(true);

    try {
      const validatedValues = createTransactionRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await createTransaction(validatedValues);

      if (result) {
        toast({
          title: "Success",
          description: "Transaction berhasil dibuat",
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
        setErrorCreateTransaction(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorCreateTransaction(
          error?.message || "Terjadi kesalahan saat membuat transaction",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat membuat transaction",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingCreateTransaction(false);
      hideModal();
    }
  };

  return {
    handleSubmit,
    loadingCreateTransaction,
    isModalVisible,
    showModal,
    hideModal,
  };
}
