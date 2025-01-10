import useTransferStore from "@/store/transfer/transfer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateTransferFormValues,
  updateTransferRequestSchema,
} from "@/schemas";
import { z } from "zod";
import useModalTransfer from "@/store/transfer/modal";
import { UpdateTransfer } from "@/types/domain/request";

export default function useUpdateTransfer() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editTransferId } =
    useModalTransfer();

  const {
    updateTransfer,
    setLoadingUpdateTransfer,
    loadingUpdateTransfer,
    setErrorUpdateTransfer,
  } = useTransferStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: UpdateTransferFormValues) => {
    setLoadingUpdateTransfer(true);

    try {
      const validatedValues = updateTransferRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const req: UpdateTransfer = {
        id: editTransferId as number,
        transfer_from: validatedValues.transfer_from,
        transfer_to: validatedValues.transfer_to,
        transfer_amount: validatedValues.transfer_amount,
        toast: toast,
      };

      const result = await updateTransfer(req);

      if (result) {
        toast({
          title: "Success",
          description: "Transfer berhasil diupdate",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal mengedit Transfer. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorUpdateTransfer(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorUpdateTransfer(
          error?.message || "Terjadi kesalahan saat mengedit Transfer",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat mengedit Transfer",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingUpdateTransfer(false);
      hideModalEdit();
    }
  };

  return {
    handleSubmit,
    loadingUpdateTransfer,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  };
}
