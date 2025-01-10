import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateMerchantForm from "../form/CreateForm";
import useModalMerchant from "@/store/merchant/modal";
import { CreateMerchantFormValues } from "@/schemas";

export function AddMerchant() {
  const { isModalVisible, showModal, hideModal } = useModalMerchant();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (data: CreateMerchantFormValues) => {
    alert(`Submitted Data: ${JSON.stringify(data, null, 2)}`);
    hideModal();
  };

  const handleButtonSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Dialog open={isModalVisible} onOpenChange={showModal}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Add New Merchant</DialogTitle>
        </DialogHeader>
        <CreateMerchantForm onSubmit={handleSubmit} ref={formRef} />
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
