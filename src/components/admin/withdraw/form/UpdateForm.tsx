import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UpdateWithdrawFormValues,
  updateWithdrawRequestSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { forwardRef } from "react";
import { WithdrawUpdateFormProps } from "@/types/form";

const UpdateWithdrawForm = forwardRef<HTMLFormElement, WithdrawUpdateFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<UpdateWithdrawFormValues>({
      resolver: zodResolver(updateWithdrawRequestSchema),
      defaultValues: {
        card_number: "",
        withdraw_amount: 0,
        withdraw_time: new Date().toISOString().slice(0, 16),
      },
    });

    return (
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="card_number" className="text-sm font-medium">
            Card Number
          </Label>
          <Input
            id="card_number"
            type="text"
            placeholder="Enter card number"
            className="mt-1"
            {...register("card_number")}
          />
          {errors.card_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.card_number.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="withdraw_amount" className="text-sm font-medium">
            Withdraw Amount
          </Label>
          <Input
            id="withdraw_amount"
            type="number"
            placeholder="Enter withdraw amount"
            className="mt-1"
            {...register("withdraw_amount", { valueAsNumber: true })}
          />
          {errors.withdraw_amount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.withdraw_amount.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="withdraw_time" className="text-sm font-medium">
            Withdraw Time
          </Label>
          <Controller
            name="withdraw_time"
            control={control}
            render={({ field }) => (
              <Input
                id="withdraw_time"
                type="datetime-local"
                className="mt-1"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          {errors.withdraw_time && (
            <p className="text-red-500 text-sm mt-1">
              {errors.withdraw_time.message}
            </p>
          )}
        </div>
      </form>
    );
  },
);

UpdateWithdrawForm.displayName = "UpdateWithdrawForm";

export default UpdateWithdrawForm;
