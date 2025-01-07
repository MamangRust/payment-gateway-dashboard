import useCardStore from "@/store/card/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import useModalCard from "@/store/card/modal";

export default function useDeleteCard() {
  const {
    deleteCardId,
    isModalVisibleDelete,
    showModalDelete,
    hideModalDelete,
  } = useModalCard();

  const {
    trashedCard,
    setLoadingTrashedCard,
    loadingTrashedCard,
    setErrorTrashedCard,
  } = useCardStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoadingTrashedCard(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await trashedCard(deleteCardId as number);

      if (result) {
        toast({
          title: "Success",
          description: "Card berhasil diupdate",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat card. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorTrashedCard(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorTrashedCard(
          error?.message || "Terjadi kesalahan saat menghapus card",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat menghapus card",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingTrashedCard(false);
      hideModalDelete();
    }
  };

  return {
    handleSubmit,
    loadingTrashedCard,
    isModalVisibleDelete,
    showModalDelete,
    hideModalDelete,
  };
}
