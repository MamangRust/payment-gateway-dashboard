import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateTransactionForm from "../form/CreateForm";
import useModalTransaction from "@/store/transaction/modal";
import { UpdateTransactionFormValues } from "@/schemas";
import UpdateTransactionForm from "../form/UpdateForm";

export function UpdateTransaction() {
  const {
    editTransactionId,
    isModalVisibleEdit,
    showModalEdit,
    hideModalEdit,
  } = useModalTransaction();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: UpdateTransactionFormValues) => {
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
        open ? showModalEdit(editTransactionId!) : hideModalEdit()
      }
    >
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <UpdateTransactionForm onSubmit={handleSubmit} ref={formRef} />
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
