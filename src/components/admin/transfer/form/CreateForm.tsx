import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateTransferFormValues,
  createTransferRequestSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forwardRef } from "react";
import { TransferCreateFormProps } from "@/types/form";

const CreateTransferForm = forwardRef<HTMLFormElement, TransferCreateFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateTransferFormValues>({
      resolver: zodResolver(createTransferRequestSchema),
      defaultValues: {
        transfer_from: "",
        transfer_to: "",
        transfer_amount: 0,
      },
    });

    return (
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="transfer_from" className="text-sm font-medium">
            Transfer From
          </Label>
          <Input
            id="transfer_from"
            type="text"
            placeholder="Enter account or source"
            className="mt-1"
            {...register("transfer_from")}
          />
          {errors.transfer_from && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transfer_from.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="transfer_to" className="text-sm font-medium">
            Transfer To
          </Label>
          <Input
            id="transfer_to"
            type="text"
            placeholder="Enter recipient account"
            className="mt-1"
            {...register("transfer_to")}
          />
          {errors.transfer_to && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transfer_to.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="transfer_amount" className="text-sm font-medium">
            Transfer Amount
          </Label>
          <Input
            id="transfer_amount"
            type="number"
            placeholder="Enter transfer amount"
            className="mt-1"
            {...register("transfer_amount", { valueAsNumber: true })}
          />
          {errors.transfer_amount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transfer_amount.message}
            </p>
          )}
        </div>
      </form>
    );
  },
);

CreateTransferForm.displayName = "CreateTransferForm";

export default CreateTransferForm;
