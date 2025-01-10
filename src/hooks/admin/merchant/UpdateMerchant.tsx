import useMerchantStore from "@/store/merchant/merchant";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateMerchantFormValues,
  updateMerchantRequestSchema,
} from "@/schemas";
import { z } from "zod";
import useModalMerchant from "@/store/merchant/modal";
import { UpdateMerchant } from "@/types/domain/request";

export default function useUpdateMerchant() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editMerchantId } =
    useModalMerchant();

  const {
    updateMerchant,
    setLoadingUpdateMerchant,
    loadingUpdateMerchant,
    setErrorUpdateMerchant,
  } = useMerchantStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: UpdateMerchantFormValues) => {
    setLoadingUpdateMerchant(true);

    try {
      const validatedValues = updateMerchantRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const req: UpdateMerchant = {
        id: editMerchantId as number,
        user_id: validatedValues.user_id,
        name: validatedValues.name,
        status: validatedValues.status,
        toast: toast,
      };

      const result = await updateMerchant(req);

      if (result) {
        toast({
          title: "Success",
          description: "Merchant berhasil diupdate",
          variant: "default",
        });

        navigate(window.location.pathname);
      } else {
        toast({
          title: "Error",
          description: "Gagal membuat Merchant. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorUpdateMerchant(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorUpdateMerchant(
          error?.message || "Terjadi kesalahan saat mengedit merchant",
        );
        toast({
          title: "Error",
          description:
            error?.message || "Terjadi kesalahan saat mengedit merchant",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingUpdateMerchant(false);
      hideModalEdit();
    }
  };

  return {
    handleSubmit,
    loadingUpdateMerchant,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  };
}
