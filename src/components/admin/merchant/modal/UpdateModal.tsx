import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalMerchant from "@/store/merchant/modal";
import UpdateMerchantForm from "../form/UpdateForm";
import { UpdateMerchantFormValues } from "@/schemas";

export function UpdateMerchant() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editMerchantId } =
    useModalMerchant();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: UpdateMerchantFormValues) => {
    alert(`Submitted Data: ${JSON.stringify(data, null, 2)}`);
    hideModalEdit();
  };

  const handleButtonSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Dialog
      open={isModalVisibleEdit}
      onOpenChange={(open) =>
        open ? showModalEdit(editMerchantId!) : hideModalEdit()
      }
    >
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Update Merchant</DialogTitle>
        </DialogHeader>
        <UpdateMerchantForm onSubmit={handleSubmit} ref={formRef} />
        <DialogFooter>
          <Button variant="outline" onClick={hideModalEdit}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleButtonSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
