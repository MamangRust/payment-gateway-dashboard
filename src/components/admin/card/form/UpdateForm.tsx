import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpdateCardFormValues, updateCardRequestSchema } from "@/schemas";
import { CardUpdateFormProps } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

const cardTypeOptions = [
  { value: "credit", label: "Credit Card" },
  { value: "debit", label: "Debit Card" },
];

const cardProviderOptions = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "MasterCard" },
  { value: "amex", label: "American Express" },
];

const UpdateCardForm = forwardRef<HTMLFormElement, CardUpdateFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UpdateCardFormValues>({
      resolver: zodResolver(updateCardRequestSchema),
    });

    return (
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="userId" className="text-sm font-medium">
            User ID
          </Label>
          <Input
            id="userId"
            type="text"
            placeholder="Enter User ID"
            className="mt-1"
            {...register("user_id")}
          />
          {errors.user_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.user_id.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="cardType" className="text-sm font-medium">
            Card Type
          </Label>
          <select
            id="cardType"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            {...register("card_type")}
          >
            <option value="">Select card type</option>
            {cardTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.card_type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.card_type.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="cardProvider" className="text-sm font-medium">
            Card Provider
          </Label>
          <select
            id="cardProvider"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            {...register("card_provider")}
          >
            <option value="">Select card provider</option>
            {cardProviderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.card_provider && (
            <p className="text-red-500 text-sm mt-1">
              {errors.card_provider.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="expireDate" className="text-sm font-medium">
            Expire Date
          </Label>
          <Input
            id="expireDate"
            type="text"
            placeholder="MM/YY"
            className="mt-1"
            {...register("expire_date")}
          />
          {errors.expire_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expire_date.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="cvv" className="text-sm font-medium">
            CVV
          </Label>
          <Input
            id="cvv"
            type="password"
            placeholder="Enter CVV"
            className="mt-1"
            {...register("cvv")}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
          )}
        </div>
      </form>
    );
  },
);

UpdateCardForm.displayName = "UpdateCardForm";

export default UpdateCardForm;
