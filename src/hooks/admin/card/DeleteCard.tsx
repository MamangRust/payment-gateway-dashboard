import useCardStore from "@/store/card/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
          description: "Card berhasil dihapus",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal menghapus card. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.message || "Terjadi kesalahan saat menghapus card";
      setErrorTrashedCard(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
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
