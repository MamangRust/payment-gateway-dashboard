import useSaldoStore from "@/store/saldo/saldo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import useModalSaldo from "@/store/saldo/modal";

export default function useDeleteSaldo() {
  const {
    deleteSaldoId,
    isModalVisibleDelete,
    showModalDelete,
    hideModalDelete,
  } = useModalSaldo();

  const {
    trashedSaldo,
    setLoadingTrashedSaldo,
    loadingTrashedSaldo,
    setErrorTrashedSaldo,
  } = useSaldoStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoadingTrashedSaldo(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await trashedSaldo(deleteSaldoId as number);

      if (result) {
        toast({
          title: "Success",
          description: "Saldo berhasil diupdate",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat saldo. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorTrashedSaldo(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorTrashedSaldo(
          error?.message || "Terjadi kesalahan saat menghapus saldo",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat menghapus saldo",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingTrashedSaldo(false);
      hideModalDelete();
    }
  };

  return {
    handleSubmit,
    loadingTrashedSaldo,
    isModalVisibleDelete,
    showModalDelete,
    hideModalDelete,
  };
}
