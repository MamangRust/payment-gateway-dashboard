import useUserStore from "@/store/user/user";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CreateUserFormValues, createUserSchema } from "@/schemas";
import { z } from "zod";
import useModalUser from "@/store/user/modal";

export default function useCreateUser() {
  const { isModalVisible, showModal, hideModal } = useModalUser();

  const {
    createUser,
    setLoadingCreateUser,
    loadingCreateUser,
    setErrorCreateUser,
  } = useUserStore();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CreateUserFormValues) => {
    setLoadingCreateUser(true);

    try {
      const validatedValues = createUserSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result = await createUser(validatedValues);

      if (result) {
        toast({
          title: "Success",
          description: "User berhasil dibuat",
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
        setErrorCreateUser(errorMessage);
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        setErrorCreateUser(
          error?.message || "Terjadi kesalahan saat membuat user",
        );
        toast({
          title: "Error",
          description: error?.message || "Terjadi kesalahan saat membuat user",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingCreateUser(false);
      hideModal();
    }
  };

  return {
    handleSubmit,
    loadingCreateUser,
    isModalVisible,
    showModal,
    hideModal,
  };
}
