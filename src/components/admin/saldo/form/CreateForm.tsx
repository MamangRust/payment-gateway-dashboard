import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateSaldoFormValues, createSaldoRequestSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forwardRef } from "react";
import { SaldoCreateFormProps } from "@/types/form";

const CreateSaldoForm = forwardRef<HTMLFormElement, SaldoCreateFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateSaldoFormValues>({
      resolver: zodResolver(createSaldoRequestSchema),
      defaultValues: {
        card_number: "",
        total_balance: 0,
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
          <Label htmlFor="total_balance" className="text-sm font-medium">
            Total Balance
          </Label>
          <Input
            id="total_balance"
            type="number"
            placeholder="Enter total balance"
            className="mt-1"
            {...register("total_balance", { valueAsNumber: true })}
          />
          {errors.total_balance && (
            <p className="text-red-500 text-sm mt-1">
              {errors.total_balance.message}
            </p>
          )}
        </div>
      </form>
    );
  },
);

CreateSaldoForm.displayName = "CreateSaldoForm";

export default CreateSaldoForm;
