import useUserStore from "@/store/user/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UpdateUserFormValues, updateUserRequestSchema } from "@/schemas";
import { z } from "zod";
import useModalUser from "@/store/user/modal";
import { UpdateUser } from "@/types/domain/request";

export default function useUpdateUser() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editUserId } =
    useModalUser();

  const {
    updateUser,
    setLoadingUpdateUser,
    loadingUpdateUser,
    setErrorUpdateUser,
  } = useUserStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: UpdateUserFormValues) => {
    setLoadingUpdateUser(true);

    try {
      const validatedValues = updateUserRequestSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const req: UpdateUser = {
        id: editUserId as number,
        firstname: validatedValues.firstname,
        lastname: validatedValues.lastname,
        email: validatedValues.email,
        password: validatedValues.password,
        confirm_password: validatedValues.confirm_password,
        toast: toast,
      };

      const result = await updateUser(req);

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
          description: "Gagal membuat user. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        setErrorUpdateUser(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorUpdateUser(
          error?.message || "Terjadi kesalahan saat mengedit user",
        );
        toast({
          title: "Error",
          description: error?.message || "Terjadi kesalahan saat mengedit user",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingUpdateUser(false);
      hideModalEdit();
    }
  };

  return {
    handleSubmit,
    loadingUpdateUser,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  };
}
