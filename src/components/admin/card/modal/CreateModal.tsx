import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateCardForm from "../form/CreateForm";
import useModalCard from "@/store/card/modal";
import { useRef } from "react";
import { CreateCardFormValues } from "@/schemas";

export function AddCard() {
  const { isModalVisible, showModal, hideModal } = useModalCard();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: CreateCardFormValues) => {
    alert(`Submitted Data: ${JSON.stringify(data, null, 2)}`);
    hideModal();
  };

  const handleButtonSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Dialog
      open={isModalVisible}
      onOpenChange={(open) => (open ? showModal() : hideModal())}
    >
      <DialogTrigger asChild>
        <Button variant="default" size="sm" onClick={showModal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <CreateCardForm onSubmit={handleSubmit} ref={formRef} />
        <DialogFooter>
          <Button variant="outline" onClick={hideModal}>
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
