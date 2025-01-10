import useWithdrawStore from "@/store/withdraw/withdraw";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateWithdrawFormValues,
  updateWithdrawRequestSchema,
} from "@/schemas";
import { z } from "zod";
import useModalWithdraw from "@/store/withdraw/modal";
import { UpdateWithdraw } from "@/types/domain/request";

export default function useUpdateUser() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editWithdrawId } =
    useModalWithdraw();

  const {
    updateWithdraw,
    setLoadingUpdateWithdraw,
    loadingUpdateWithdraw,
    setErrorUpdateWithdraw,
  } = useWithdrawStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: UpdateWithdrawFormValues) => {
    setLoadingUpdateWithdraw(true);

    try {
      const validatedValues = updateWithdrawRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const req: UpdateWithdraw = {
        id: editWithdrawId as number,
        card_number: validatedValues.card_number,
        withdraw_amount: validatedValues.withdraw_amount,
        withdraw_time: validatedValues.withdraw_time,
        toast: toast,
      };

      const result = await updateWithdraw(req);

      if (result) {
        toast({
          title: "Success",
          description: "withdraw berhasil diupdate",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat withdraw. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorUpdateWithdraw(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorUpdateWithdraw(
          error?.message || "Terjadi kesalahan saat mengedit withdraw",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat mengedit withdraw",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingUpdateWithdraw(false);
      hideModalEdit();
    }
  };

  return {
    handleSubmit,
    loadingUpdateWithdraw,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  };
}
