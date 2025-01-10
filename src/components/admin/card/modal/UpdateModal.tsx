import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateCardForm from "../form/CreateForm";
import useModalCard from "@/store/card/modal";
import { useRef } from "react";
import { UpdateCardFormValues } from "@/schemas";

export function UpdateCard() {
  const { isModalVisibleEdit, showModalEdit, hideModalEdit, editCardId } =
    useModalCard();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: UpdateCardFormValues) => {
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
        open ? showModalEdit(editCardId!) : hideModalEdit()
      }
    >
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Update Card</DialogTitle>
        </DialogHeader>
        <CreateCardForm onSubmit={handleSubmit} ref={formRef} />
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
