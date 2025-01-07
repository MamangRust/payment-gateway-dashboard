import useCardStore from "@/store/card/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreateCardFormValues, createCardRequestSchema } from "@/schemas";
import { z } from "zod";
import useModalCard from "@/store/card/modal";

export default function useCreateUser() {
  const { isModalVisible, showModal, hideModal } = useModalCard();

  const {
    createCard,
    setLoadingCreateCard,
    loadingCreateCard,
    setErrorCreateCard,
  } = useCardStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateCardFormValues) => {
    setLoadingCreateCard(true);

    try {
      const validatedValues = createCardRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await createCard(validatedValues);

      if (result) {
        toast({
          title: "Success",
          description: "Card berhasil dibuat",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat Card. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorCreateCard(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorCreateCard(
          error?.message || "Terjadi kesalahan saat membuat Card",
        );
        toast({
          title: "Error",
          description: error?.message || "Terjadi kesalahan saat membuat Card",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingCreateCard(false);
      hideModal();
    }
  };

  return {
    handleSubmit,
    loadingCreateCard,
    isModalVisible,
    showModal,
    hideModal,
  };
}
