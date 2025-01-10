import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalWithdraw from "@/store/withdraw/modal";
import UpdateWithdrawForm from "../form/UpdateForm";
import { UpdateWithdrawFormValues } from "@/schemas";

export function UpdateWithdraw() {
  const { editWithdrawId, isModalVisibleEdit, showModalEdit, hideModalEdit } =
    useModalWithdraw();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: UpdateWithdrawFormValues) => {
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
        open ? showModalEdit(editWithdrawId!) : hideModalEdit()
      }
    >
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add New Withdraw</DialogTitle>
        </DialogHeader>
        <UpdateWithdrawForm onSubmit={handleSubmit} ref={formRef} />
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
