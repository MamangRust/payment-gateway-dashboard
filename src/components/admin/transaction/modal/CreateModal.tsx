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
import { CreateTransactionFormValues } from "@/schemas";
import useCreateTransaction from "@/hooks/admin/transaction/CreateTransaction";

export function AddTransaction() {
  const {
    formRef,
    handleButtonSubmit,
    handleSubmit,
    loadingCreateTransaction,
    isModalVisible,
    showModal,
    hideModal,
  } = useCreateTransaction();

  return (
    <Dialog
      open={isModalVisible}
      onOpenChange={(open) => (open ? showModal() : hideModal())}
    >
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <CreateTransactionForm onSubmit={handleSubmit} ref={formRef} />
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
