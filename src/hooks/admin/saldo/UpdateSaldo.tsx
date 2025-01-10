import useSaldoStore from "@/store/saldo/saldo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UpdateSaldoFormValues, updateSaldoRequestSchema } from "@/schemas";
import { z } from "zod";
import useModalSaldo from "@/store/saldo/modal";
import { UpdateSaldo } from "@/types/domain/request";

export default function useUpdateSaldo() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editSaldoId } =
    useModalSaldo();

  const {
    updateSaldo,
    setLoadingUpdateSaldo,
    loadingUpdateSaldo,
    setErrorUpdateSaldo,
  } = useSaldoStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: UpdateSaldoFormValues) => {
    setLoadingUpdateSaldo(true);

    try {
      const validatedValues = updateSaldoRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const req: UpdateSaldo = {
        id: editSaldoId as number,
        card_number: validatedValues.card_number,
        total_balance: validatedValues.total_balance,
        toast: toast,
      };

      const result = await updateSaldo(req);

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
          description: "Gagal membuat saldo. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorUpdateSaldo(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorUpdateSaldo(
          error?.message || "Terjadi kesalahan saat mengedit saldo",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat mengedit saldo",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingUpdateSaldo(false);
      hideModalEdit();
    }
  };

  return {
    handleSubmit,
    loadingUpdateSaldo,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  };
}
