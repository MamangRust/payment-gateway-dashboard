import useSaldoStore from "@/store/saldo/saldo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreateSaldoFormValues, createSaldoRequestSchema } from "@/schemas";
import { z } from "zod";
import useModalSaldo from "@/store/saldo/modal";

export default function useCreateSaldo() {
  const { isModalVisible, showModal, hideModal } = useModalSaldo();

  const {
    createSaldo,
    setLoadingCreateSaldo,
    loadingCreateSaldo,
    setErrorCreateSaldo,
  } = useSaldoStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateSaldoFormValues) => {
    setLoadingCreateSaldo(true);

    try {
      const validatedValues = createSaldoRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await createSaldo(validatedValues);

      if (result) {
        toast({
          title: "Success",
          description: "Saldo berhasil dibuat",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat Saldo. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorCreateSaldo(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorCreateSaldo(
          error?.message || "Terjadi kesalahan saat membuat saldo",
        );
        toast({
          title: "Error",
          description: error?.message || "Terjadi kesalahan saat membuat saldo",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingCreateSaldo(false);
      hideModal();
    }
  };

  return {
    handleSubmit,
    loadingCreateSaldo,
    isModalVisible,
    showModal,
    hideModal,
  };
}
