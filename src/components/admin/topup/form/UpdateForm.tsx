import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateTopupFormValues, updateTopupRequestSchema } from "@/schemas";
import { TopupUpdateFormProps } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

const topupMethodOptions = [
  { value: "credit_card", label: "Credit Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "e_wallet", label: "E-Wallet" },
  { value: "cash", label: "Cash" },
];

const UpdateTopupForm = forwardRef<HTMLFormElement, TopupUpdateFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UpdateTopupFormValues>({
      resolver: zodResolver(updateTopupRequestSchema),
      defaultValues: {
        card_number: "",
        topup_amount: 0,
        topup_method: "credit_card",
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
          <Label htmlFor="topup_amount" className="text-sm font-medium">
            Top-up Amount
          </Label>
          <Input
            id="topup_amount"
            type="number"
            placeholder="Enter top-up amount"
            className="mt-1"
            {...register("topup_amount", { valueAsNumber: true })}
          />
          {errors.topup_amount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.topup_amount.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="topup_method" className="text-sm font-medium">
            Top-up Method
          </Label>
          <select
            id="topup_method"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            {...register("topup_method")}
          >
            <option value="">Select top-up method</option>
            {topupMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.topup_method && (
            <p className="text-red-500 text-sm mt-1">
              {errors.topup_method.message}
            </p>
          )}
        </div>
      </form>
    );
  },
);

UpdateTopupForm.displayName = "UpdateTopupForm";

export default UpdateTopupForm;
