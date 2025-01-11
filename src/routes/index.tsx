import DashboardPage from "@/pages/admin/dashboard/dashboard";
import LayoutAdmin from "@/layouts/admin";
import ErrorPage from "@/pages/error";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/auth";
import LoginPage from "@/pages/auth/login";
import PointOfSalePage from "@/pages/admin/point-of-sale";
import TablePayment from "@/pages/admin/table";
import TermsOfServicePage from "@/pages/TermOfService";
import CompanyProfile from "@/pages/Home";
import CardDashboard from "@/pages/admin/dashboard/dashboard-card";
import DashboardSaldo from "@/pages/admin/dashboard/dashboard-saldo";
import DashboardMerchant from "@/pages/admin/dashboard/dashboard-merchant";
import DashboardTopups from "@/pages/admin/dashboard/dashboard-topup";
import DashboardTransactions from "@/pages/admin/dashboard/dashboard-transaction";
import DashboardTransfers from "@/pages/admin/dashboard/dashboard-transfer";
import DashboardWithdraws from "@/pages/admin/dashboard/dashboard-withdraw";
import ProfilePage from "@/pages/admin/user-profile";
import SaldoPage from "@/pages/admin/saldo/saldo";
import CardPage from "@/pages/admin/card/card";
import MerchantPage from "@/pages/admin/merchant/merchant";
import TopupPage from "@/pages/admin/topup/topup";
import TransactionPage from "@/pages/admin/transaction/transaction";
import WithdrawPage from "@/pages/admin/withdraw/withdraw";
import UserPage from "@/pages/admin/user/user";
import TransferPage from "@/pages/admin/transfer/transfer";
import RegisterPage from "@/pages/auth/register";
import CardTrashedPage from "@/pages/admin/card/cardTrashed";
import MerchantTrashedPage from "@/pages/admin/merchant/merchantTrashed";
import SaldoTrashedPage from "@/pages/admin/saldo/saldoTrashed";
import TopupTrashedPage from "@/pages/admin/topup/topupTrashed";
import TransactionTrashedPage from "@/pages/admin/transaction/transactionTrashed";
import TransferTrashedPage from "@/pages/admin/transfer/tansferTrashed";
import UserTrashedPage from "@/pages/admin/user/userTrashed";
import WithdrawTrashedPage from "@/pages/admin/withdraw/withdrawTrashed";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "card",
        element: <CardDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "merchant",
        element: <DashboardMerchant />,
        errorElement: <ErrorPage />,
      },
      {
        path: "saldo",
        element: <DashboardSaldo />,
        errorElement: <ErrorPage />,
      },
      {
        path: "topup",
        element: <DashboardTopups />,
        errorElement: <ErrorPage />,
      },
      {
        path: "transaction",
        element: <DashboardTransactions />,
        errorElement: <ErrorPage />,
      },
      {
        path: "transfer",
        element: <DashboardTransfers />,
        errorElement: <ErrorPage />,
      },
      {
        path: "withdraw",
        element: <DashboardWithdraws />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/cards",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CardPage />,
      },
      {
        path: "trashed",
        element: <CardTrashedPage />,
      },
    ],
  },
  {
    path: "/merchants",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MerchantPage />,
      },
      {
        path: "trashed",
        element: <MerchantTrashedPage />,
      },
    ],
  },
  {
    path: "/saldos",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SaldoPage />,
      },
      {
        path: "trashed",
        element: <SaldoTrashedPage />,
      },
    ],
  },
  {
    path: "/topups",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TopupPage />,
      },
      {
        path: "trashed",
        element: <TopupTrashedPage />,
      },
    ],
  },
  {
    path: "/transactions",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TransactionPage />,
      },
      {
        path: "trashed",
        element: <TransactionTrashedPage />,
      },
    ],
  },
  {
    path: "/transfers",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TransferPage />,
      },
      {
        path: "trashed",
        element: <TransferTrashedPage />,
      },
    ],
  },
  {
    path: "/users",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "trashed",
        element: <UserTrashedPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/withdraws",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WithdrawPage />,
      },
      {
        path: "trashed",
        element: <WithdrawTrashedPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/point-of-sale",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PointOfSalePage />,
      },
    ],
  },
  {
    path: "/term",
    element: <TermsOfServicePage />,
  },
  {
    path: "/",
    element: <CompanyProfile />,
  },
  {
    path: "/table",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TablePayment />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
