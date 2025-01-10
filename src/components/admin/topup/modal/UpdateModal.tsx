import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalTopup from "@/store/topup/modal";
import UpdateTopupForm from "../form/UpdateForm";
import { UpdateTopupFormValues } from "@/schemas";

export function UpdateTopup() {
  const { editTopupId, isModalVisibleEdit, showModalEdit, hideModalEdit } =
    useModalTopup();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: UpdateTopupFormValues) => {
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
        open ? showModalEdit(editTopupId!) : hideModalEdit()
      }
    >
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add New Top-up</DialogTitle>
        </DialogHeader>
        <UpdateTopupForm onSubmit={handleSubmit} ref={formRef} />
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
