import { useRef } from "react";
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
import CreateTopupForm from "../form/CreateForm";
import useModalTopup from "@/store/topup/modal";
import { CreateTopupFormValues } from "@/schemas";

export function AddTopup() {
  const { isModalVisible, showModal, hideModal } = useModalTopup();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: CreateTopupFormValues) => {
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
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add New Top-up</DialogTitle>
        </DialogHeader>
        <CreateTopupForm onSubmit={handleSubmit} ref={formRef} />
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
