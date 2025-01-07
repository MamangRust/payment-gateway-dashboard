import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateTransactionFormValues,
  createTransactionRequestSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { forwardRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TransactionCreateFormProps } from "@/types/form";

const paymentMethodOptions = [
  { value: "credit_card", label: "Credit Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "e_wallet", label: "E-Wallet" },
  { value: "cash", label: "Cash" },
];

const CreateTransactionForm = forwardRef<
  HTMLFormElement,
  TransactionCreateFormProps
>(({ onSubmit }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(createTransactionRequestSchema),
    defaultValues: {
      card_number: "",
      amount: 0,
      payment_method: "credit_card",
      merchant_id: 0,
      transaction_time: new Date(),
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
        <Label htmlFor="amount" className="text-sm font-medium">
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          className="mt-1"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="payment_method" className="text-sm font-medium">
          Payment Method
        </Label>
        <Controller
          name="payment_method"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.payment_method && (
          <p className="text-red-500 text-sm mt-1">
            {errors.payment_method.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="merchant_id" className="text-sm font-medium">
          Merchant ID
        </Label>
        <Input
          id="merchant_id"
          type="number"
          placeholder="Enter merchant ID"
          className="mt-1"
          {...register("merchant_id", { valueAsNumber: true })}
        />
        {errors.merchant_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.merchant_id.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="transaction_time" className="text-sm font-medium">
          Transaction Time
        </Label>
        <Input
          id="transaction_time"
          type="datetime-local"
          className="mt-1"
          {...register("transaction_time")}
        />
        {errors.transaction_time && (
          <p className="text-red-500 text-sm mt-1">
            {errors.transaction_time.message}
          </p>
        )}
      </div>
    </form>
  );
});

CreateTransactionForm.displayName = "CreateTransactionForm";

export default CreateTransactionForm;
