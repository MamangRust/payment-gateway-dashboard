import CardModal from "./card/modal";
import MerchantModal from "./merchant/modal";
import SaldoModal from "./saldo/modal";
import TopupModal from "./topup/modal";
import TransactionModal from "./transaction/modal";
import TransferModal from "./transfer/modal";
import UserModal from "./user/modal";
import WithdrawModal from "./withdraw/modal";

export default function ModalAdmin() {
  return (
    <>
      <UserModal />
      <CardModal />
      <MerchantModal />
      <SaldoModal />
      <TopupModal />
      <TransactionModal />
      <TransferModal />
      <WithdrawModal />
    </>
  );
}
