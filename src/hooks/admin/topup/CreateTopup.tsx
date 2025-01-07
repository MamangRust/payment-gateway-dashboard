import useTopupStore from "@/store/topup/topup";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreateTopupFormValues, createTopupRequestSchema } from "@/schemas";
import { z } from "zod";
import useModalTopup from "@/store/topup/modal";

export default function useCreateTopup() {
  const { isModalVisible, showModal, hideModal } = useModalTopup();

  const {
    createTopup,
    setLoadingCreateTopup,
    loadingCreateTopup,
    setErrorCreateTopup,
  } = useTopupStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateTopupFormValues) => {
    setLoadingCreateTopup(true);

    try {
      const validatedValues = createTopupRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await createTopup(validatedValues);

      if (result) {
        toast({
          title: "Success",
          description: "Topup berhasil dibuat",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat Topup. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorCreateTopup(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorCreateTopup(
          error?.message || "Terjadi kesalahan saat membuat Topup",
        );
        toast({
          title: "Error",
          description: error?.message || "Terjadi kesalahan saat membuat Topup",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingCreateTopup(false);
      hideModal();
    }
  };

  return {
    handleSubmit,
    loadingCreateTopup,
    isModalVisible,
    showModal,
    hideModal,
  };
}
