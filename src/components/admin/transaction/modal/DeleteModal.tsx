import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import useModalTransaction from "@/store/transaction/modal";
import useDeleteTransaction from "@/hooks/admin/transaction/DeleteTransaction";

export function DeleteTransaction() {
  const {
    deleteTransactionId,
    handleSubmit,
    loadingTrashedTransaction,
    isModalVisibleDelete,
    showModalDelete,
    hideModalDelete,
  } = useDeleteTransaction();

  return (
    <Dialog
      open={isModalVisibleDelete}
      onOpenChange={(open) =>
        open ? showModalDelete(deleteTransactionId!) : hideModalDelete()
      }
    >
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600">
          Are you sure you want to delete this card? This action cannot be
          undone.
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={hideModalDelete}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
