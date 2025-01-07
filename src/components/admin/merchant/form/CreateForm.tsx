import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateMerchantFormValues,
  createMerchantRequestSchema,
} from "@/schemas";
import { MerchantCreateFormProps } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

// const statusOptions = [
//   { value: "active", label: "Active" },
//   { value: "inactive", label: "Inactive" },
//   { value: "pending", label: "Pending" },
// ];

const CreateMerchantForm = forwardRef<HTMLFormElement, MerchantCreateFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateMerchantFormValues>({
      resolver: zodResolver(createMerchantRequestSchema),
      defaultValues: {
        name: "",
        user_id: 0,
      },
    });

    return (
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter merchant name"
            className="mt-1"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="user_id" className="text-sm font-medium">
            User ID
          </Label>
          <Input
            id="user_id"
            type="number"
            placeholder="Enter user ID"
            className="mt-1"
            {...register("user_id", { valueAsNumber: true })}
          />
          {errors.user_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.user_id.message}
            </p>
          )}
        </div>
      </form>
    );
  },
);

CreateMerchantForm.displayName = "CreateMerchantForm";

export default CreateMerchantForm;
