import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Send,
  ArrowDownCircle,
  CreditCard,
  Wallet,
  ArrowUpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeChart from "@/components/ui/chart";
import TableCard from "@/components/admin/card/table/table-card";
import useListCard from "@/hooks/admin/card/ListCard";
import { YearPicker } from "@/components/ui/yearpicker";
import { useToast } from "@/hooks/use-toast";
import useCardStore from "@/store/card/card";
import { formatRupiah } from "@/helpers/formatRupiah";
import { debounce } from "@/helpers/debounce";
import CardSkeleton from "@/components/ui/cardSkeleton";
import ChartSkeleton from "@/components/ui/chartSkeleton";

export default function DashboardCard() {
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  const {
    table,
    search,
    setSearch,
    loadingGetCards,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
  } = useListCard();

  const { toast } = useToast();

  const {
    dashboardCard,
    dashboard,
    loadingDashboard,
    setLoadingDashboard,
    setErrorDashboard,

    findMonthBalance,
    monthBalance,
    loadingMonthBalance,
    setLoadingMonthBalance,
    setErrorMonthBalance,

    findYearBalance,
    yearBalance,
    loadingYearBalance,
    setLoadingYearBalance,
    setErrorYearBalance,

    findMonthWithdrawAmount,
    monthWithdrawAmount,
    loadingMonthWithdrawAmount,
    setLoadingMonthWithdrawAmount,
    setErrorMonthWithdrawAmount,

    findYearWithdrawAmount,
    yearWithdrawAmount,
    loadingYearWithdrawAmount,
    setLoadingYearWithdrawAmount,
    setErrorYearWithdrawAmount,

    findYearTopupAmount,
    yearTopupAmount,
    loadingYearTopupAmount,
    setLoadingYearTopupAmount,
    setErrorYearTopupAmount,

    findMonthTopupAmount,
    monthTopupAmount,
    loadingMonthTopupAmount,
    setLoadingMonthTopupAmount,
    setErrorMonthTopupAmount,

    findYearlyTransactionAmount,
    yearTransactionAmount,
    loadingYearTransaction,
    setLoadingYearTransaction,
    setErrorYearTransaction,

    findMonthlyTransactionAmount,
    monthTransactionAmount,
    loadingMonthTransaction,
    setLoadingMonthTransaction,
    setErrorMonthTransaction,

    findMonthlyTransferSenderAmount,
    monthTransferSender,
    loadingMonthTransferSender,
    setLoadingMonthTransferSender,
    setErrorMonthTransferSender,

    findYearlyTransferSenderAmount,
    yearTransferSender,
    loadingYearTransferSender,
    setLoadingYearTransferSender,
    setErrorYearTransferSender,

    findMonthlyTransferReceiverAmount,
    monthTransferReceiver,
    loadingMonthTransferReceiver,
    setLoadingMonthTransferReceiver,
    setErrorMonthTransferReceiver,

    findYearlyTransferReceiverAmount,
    yearTransferReceiver,
    loadingYearTransferReceiver,
    setErrorYearTransferReceiver,
    setLoadingYearTransferReceiver,
  } = useCardStore();

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
  };

  const monthlyBalances = useMemo(() => {
    if (!monthBalance || !Array.isArray(monthBalance)) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthBalance.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_balance !== undefined) {
        balances[monthIndex] = balance.total_balance;
      }
    });

    return balances;
  }, [monthBalance]);

  const yearlyBalances = useMemo(() => {
    if (!yearBalance || !Array.isArray(yearBalance)) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearBalance.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_balance);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    const result = years.map((year) => balanceMap.get(year) || 0);

    return result;
  }, [yearBalance]);

  const monthlyWithdraws = useMemo(() => {
    if (!monthWithdrawAmount || !Array.isArray(monthWithdrawAmount)) {
      return Array(12).fill(0);
    }

    const withdraws = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthWithdrawAmount.forEach((withdraw) => {
      const monthIndex = new Date(`${withdraw.month} 1, ${year}`).getMonth();
      if (withdraw.total_amount !== undefined) {
        withdraws[monthIndex] = withdraw.total_amount;
      }
    });

    return withdraws;
  }, [monthWithdrawAmount]);

  const yearlyWithdraws = useMemo(() => {
    if (!yearWithdrawAmount || !Array.isArray(yearWithdrawAmount)) {
      return Array(5).fill(0);
    }

    const withdrawMap = new Map<number, number>();
    yearWithdrawAmount.forEach((withdraw) => {
      withdrawMap.set(Number(withdraw.year), withdraw.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => withdrawMap.get(year) || 0);
  }, [yearWithdrawAmount]);

  const monthlyTopups = useMemo(() => {
    if (!monthTopupAmount || !Array.isArray(monthTopupAmount)) {
      return Array(12).fill(0);
    }

    const topups = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTopupAmount.forEach((topup) => {
      const monthIndex = new Date(`${topup.month} 1, ${year}`).getMonth();
      if (topup.total_amount !== undefined) {
        topups[monthIndex] = topup.total_amount;
      }
    });

    return topups;
  }, [monthTopupAmount]);

  const yearlyTopups = useMemo(() => {
    if (!yearTopupAmount || !Array.isArray(yearTopupAmount)) {
      return Array(5).fill(0);
    }

    const topupMap = new Map<number, number>();
    yearTopupAmount.forEach((topup) => {
      topupMap.set(Number(topup.year), topup.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => topupMap.get(year) || 0);
  }, [yearTopupAmount]);

  const monthlyTransactions = useMemo(() => {
    if (!monthTransactionAmount || !Array.isArray(monthTransactionAmount)) {
      return Array(12).fill(0);
    }

    const transactions = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransactionAmount.forEach((transaction) => {
      const monthIndex = new Date(`${transaction.month} 1, ${year}`).getMonth();
      if (transaction.total_amount !== undefined) {
        transactions[monthIndex] = transaction.total_amount;
      }
    });

    return transactions;
  }, [monthTransactionAmount]);

  const yearlyTransactions = useMemo(() => {
    if (!yearTransactionAmount || !Array.isArray(yearTransactionAmount)) {
      return Array(5).fill(0);
    }

    const transactionMap = new Map<number, number>();
    yearTransactionAmount.forEach((transaction) => {
      transactionMap.set(Number(transaction.year), transaction.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => transactionMap.get(year) || 0);
  }, [yearTransactionAmount]);

  const monthlyTransfersSender = useMemo(() => {
    if (!monthTransferSender || !Array.isArray(monthTransferSender)) {
      return Array(12).fill(0);
    }

    const transfers = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransferSender.forEach((transfer) => {
      const monthIndex = new Date(`${transfer.month} 1, ${year}`).getMonth();
      if (transfer.total_amount !== undefined) {
        transfers[monthIndex] = transfer.total_amount;
      }
    });

    return transfers;
  }, [monthTransferSender]);

  const yearlyTransfersSender = useMemo(() => {
    if (!yearTransferSender || !Array.isArray(yearTransferSender)) {
      return Array(5).fill(0);
    }

    const transferMap = new Map<number, number>();
    yearTransferSender.forEach((transfer) => {
      transferMap.set(Number(transfer.year), transfer.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => transferMap.get(year) || 0);
  }, [yearTransferSender]);

  const monthlyTransfersReceiver = useMemo(() => {
    if (!monthTransferReceiver || !Array.isArray(monthTransferReceiver)) {
      return Array(12).fill(0);
    }

    const transfers = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransferReceiver.forEach((transfer) => {
      const monthIndex = new Date(`${transfer.month} 1, ${year}`).getMonth();
      if (transfer.total_amount !== undefined) {
        transfers[monthIndex] = transfer.total_amount;
      }
    });

    return transfers;
  }, [monthTransferReceiver]);

  const yearlyTransfersReceiver = useMemo(() => {
    if (!yearTransferReceiver || !Array.isArray(yearTransferReceiver)) {
      return Array(5).fill(0);
    }

    const transferMap = new Map<number, number>();
    yearTransferReceiver.forEach((transfer) => {
      transferMap.set(Number(transfer.year), transfer.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => transferMap.get(year) || 0);
  }, [yearTransferReceiver]);

  const fetchDashboardCard = useCallback(async () => {
    try {
      setLoadingDashboard(true);
      setErrorDashboard(null);

      await dashboardCard(toast);
    } catch (error) {
      console.error("Failed to fetch dashboard card:", error);
      setErrorDashboard("Failed to fetch dashboard card");
    } finally {
      setLoadingDashboard(false);
    }
  }, [dashboard]);

  const fetchMonthlyData = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthBalance(true);
        setErrorMonthBalance(null);

        await findMonthBalance(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly balance:", error);
        setErrorMonthBalance("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthBalance(false);
      }
    },
    [findMonthBalance, setLoadingMonthBalance, setErrorMonthBalance],
  );

  const fetchYearlyData = useCallback(
    async (year: number) => {
      try {
        setLoadingYearBalance(true);
        setErrorYearBalance(null);

        await findYearBalance(toast, year);
      } catch (error) {
        setErrorYearBalance("Failed to fetch yearly balance");
      } finally {
        setLoadingYearBalance(false);
      }
    },
    [findYearBalance, setLoadingYearBalance, setErrorYearBalance],
  );

  const fetchMonthlyWithdraws = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthWithdrawAmount(true);
        setErrorMonthWithdrawAmount(null);

        await findMonthWithdrawAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly withdraws:", error);
        setErrorMonthWithdrawAmount("Failed to fetch monthly withdraws");
      } finally {
        setLoadingMonthWithdrawAmount(false);
      }
    },
    [
      findMonthWithdrawAmount,
      setLoadingMonthWithdrawAmount,
      setErrorMonthWithdrawAmount,
    ],
  );

  const fetchYearlyWithdraws = useCallback(
    async (year: number) => {
      try {
        setLoadingYearWithdrawAmount(true);
        setErrorYearWithdrawAmount(null);

        await findYearWithdrawAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch yearly withdraws:", error);
        setErrorYearWithdrawAmount("Failed to fetch yearly withdraws");
      } finally {
        setLoadingYearWithdrawAmount(false);
      }
    },
    [
      findYearWithdrawAmount,
      setLoadingYearWithdrawAmount,
      setErrorYearWithdrawAmount,
    ],
  );

  const fetchMonthlyTopups = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTopupAmount(true);
        setErrorMonthTopupAmount(null);

        await findMonthTopupAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly topups:", error);
        setErrorMonthTopupAmount("Failed to fetch monthly topups");
      } finally {
        setLoadingMonthTopupAmount(false);
      }
    },
    [
      findMonthTopupAmount,
      setLoadingMonthTopupAmount,
      setErrorMonthTopupAmount,
    ],
  );

  const fetchYearlyTopups = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTopupAmount(true);
        setErrorYearTopupAmount(null);

        await findYearTopupAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch yearly topups:", error);
        setErrorYearTopupAmount("Failed to fetch yearly topups");
      } finally {
        setLoadingYearTopupAmount(false);
      }
    },
    [findYearTopupAmount, setLoadingYearTopupAmount, setErrorYearTopupAmount],
  );

  const fetchMonthlyTransactions = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTransaction(true);
        setErrorMonthTransaction(null);

        await findMonthlyTransactionAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly transactions:", error);
        setErrorMonthTransaction("Failed to fetch monthly transactions");
      } finally {
        setLoadingMonthTransaction(false);
      }
    },
    [
      findMonthlyTransactionAmount,
      setLoadingMonthTransaction,
      setErrorMonthTransaction,
    ],
  );

  const fetchYearlyTransactions = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTransaction(true);
        setErrorYearTransaction(null);

        await findYearlyTransactionAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch yearly transactions:", error);
        setErrorYearTransaction("Failed to fetch yearly transactions");
      } finally {
        setLoadingYearTransaction(false);
      }
    },
    [
      findYearlyTransactionAmount,
      setLoadingYearTransaction,
      setErrorYearTransaction,
    ],
  );

  const fetchMonthlyTransfersSender = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTransferSender(true);
        setErrorMonthTransferSender(null);

        await findMonthlyTransferSenderAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly transfers:", error);
        setErrorMonthTransferSender("Failed to fetch monthly transfers");
      } finally {
        setLoadingMonthTransferSender(false);
      }
    },
    [
      findMonthlyTransferSenderAmount,
      setLoadingMonthTransferSender,
      setErrorMonthTransferSender,
    ],
  );

  const fetchYearlyTransfersSender = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTransferSender(true);
        setErrorYearTransferSender(null);

        await findYearlyTransferSenderAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch yearly transfers:", error);
        setErrorYearTransferSender("Failed to fetch yearly transfers");
      } finally {
        setLoadingYearTransferSender(false);
      }
    },
    [
      findYearlyTransferSenderAmount,
      setLoadingYearTransferSender,
      setErrorYearTransferSender,
    ],
  );

  const fetchMonthlyTransfersReceiver = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTransferReceiver(true);
        setErrorMonthTransferReceiver(null);

        await findMonthlyTransferReceiverAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly transfers:", error);
        setErrorMonthTransferReceiver("Failed to fetch monthly transfers");
      } finally {
        setLoadingMonthTransferReceiver(false);
      }
    },
    [
      findMonthlyTransferReceiverAmount,
      setLoadingMonthTransferReceiver,
      setErrorMonthTransferReceiver,
    ],
  );

  const fetchYearlyTransfersReceiver = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTransferReceiver(true);
        setErrorYearTransferReceiver(null);

        await findYearlyTransferReceiverAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch yearly transfers:", error);
        setErrorYearTransferReceiver("Failed to fetch yearly transfers");
      } finally {
        setLoadingYearTransferReceiver(false);
      }
    },
    [
      findYearlyTransferReceiverAmount,
      setLoadingYearTransferReceiver,
      setErrorYearTransferReceiver,
    ],
  );

  const debouncedFetchDashboardCard = debounce(fetchDashboardCard, 300);
  const debouncedFetchMonthlyData = debounce(fetchMonthlyData, 300);
  const debouncedFetchYearlyData = debounce(fetchYearlyData, 300);
  const debouncedFetchMonthlyWithdraws = debounce(fetchMonthlyWithdraws, 300);
  const debouncedFetchYearlyWithdraws = debounce(fetchYearlyWithdraws, 300);
  const debouncedFetchMonthlyTopups = debounce(fetchMonthlyTopups, 300);
  const debouncedFetchYearlyTopups = debounce(fetchYearlyTopups, 300);
  const debouncedFetchMonthlyTransactions = debounce(
    fetchMonthlyTransactions,
    300,
  );
  const debouncedFetchYearlyTransactions = debounce(
    fetchYearlyTransactions,
    300,
  );
  const debouncedFetchMonthlyTransfersSender = debounce(
    fetchMonthlyTransfersSender,
    300,
  );
  const debouncedFetchYearlyTransfersSender = debounce(
    fetchYearlyTransfersSender,
    300,
  );
  const debouncedFetchMonthlyTransfersReceiver = debounce(
    fetchMonthlyTransfersReceiver,
    300,
  );
  const debouncedFetchYearlyTransfersReceiver = debounce(
    fetchYearlyTransfersReceiver,
    300,
  );

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        debouncedFetchDashboardCard(),
        debouncedFetchMonthlyData(selectedYear),
        debouncedFetchYearlyData(selectedYear),
        debouncedFetchMonthlyWithdraws(selectedYear),
        debouncedFetchYearlyWithdraws(selectedYear),
        debouncedFetchMonthlyTopups(selectedYear),
        debouncedFetchYearlyTopups(selectedYear),
        debouncedFetchMonthlyTransactions(selectedYear),
        debouncedFetchYearlyTransactions(selectedYear),
        debouncedFetchMonthlyTransfersSender(selectedYear),
        debouncedFetchYearlyTransfersSender(selectedYear),
        debouncedFetchMonthlyTransfersReceiver(selectedYear),
        debouncedFetchYearlyTransfersReceiver(selectedYear),
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchDashboardCard.cancel();
      debouncedFetchMonthlyData.cancel();
      debouncedFetchYearlyData.cancel();
      debouncedFetchMonthlyWithdraws.cancel();
      debouncedFetchYearlyWithdraws.cancel();
      debouncedFetchMonthlyTopups.cancel();
      debouncedFetchYearlyTopups.cancel();
      debouncedFetchMonthlyTransactions.cancel();
      debouncedFetchYearlyTransactions.cancel();
      debouncedFetchMonthlyTransfersSender.cancel();
      debouncedFetchYearlyTransfersSender.cancel();
      debouncedFetchMonthlyTransfersReceiver.cancel();
      debouncedFetchYearlyTransfersReceiver.cancel();
    };
  }, [selectedYear]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-10">
        {loadingDashboard ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <Card className="w-full shadow-lg rounded-md border p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Saldo
                </CardTitle>
                <Wallet className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatRupiah(dashboard?.total_balance ?? 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full shadow-lg rounded-md border p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Withdraw
                </CardTitle>
                <ArrowDownCircle className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatRupiah(dashboard?.total_withdraw ?? 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full shadow-lg rounded-md border p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transaction
                </CardTitle>
                <CreditCard className="h-6 w-6 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatRupiah(dashboard?.total_transaction ?? 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full shadow-lg rounded-md border p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transfer
                </CardTitle>
                <Send className="h-6 w-6 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatRupiah(dashboard?.total_transfer ?? 0)}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full shadow-lg rounded-md border p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Topup
                </CardTitle>
                <ArrowUpCircle className="h-6 w-6 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatRupiah(dashboard?.total_topup ?? 0)}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      <div className="flex-1 flex flex-col min-h-0 space-y-8 mt-4">
        <div className="flex justify-between">
          <div>
            <YearPicker
              selectedYear={selectedYear}
              onYearChange={(date) => handleYearChange(date)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {loadingMonthBalance ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-balances-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: {
                      title: { text: "Balance (Rp)" },
                      labels: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    tooltip: {
                      y: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    colors: ["#6366F1"],
                  }}
                  series={[{ name: "Monthly Balance", data: monthlyBalances }]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearBalance ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-balances-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: {
                      title: { text: "Balance (Rp)" },
                      labels: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    tooltip: {
                      y: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    colors: ["#22C55E"],
                  }}
                  series={[{ name: "Yearly Balance", data: yearlyBalances }]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}

          {loadingMonthWithdrawAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Withdraws</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-withdraws-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: { title: { text: "Withdraw ($)" } },
                    colors: ["#EF4444"],
                  }}
                  series={[
                    { name: "Monthly Withdraw", data: monthlyWithdraws },
                  ]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}

          {loadingYearWithdrawAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Withdraws</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-withdraws-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: { title: { text: "Withdraw ($)" } },
                    colors: ["#F97316"],
                  }}
                  series={[{ name: "Yearly Withdraw", data: yearlyWithdraws }]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingMonthTopupAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Topups</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-topups-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: { title: { text: "Topup ($)" } },
                    colors: ["#3B82F6"],
                  }}
                  series={[{ name: "Monthly Topup", data: monthlyTopups }]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTopupAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Topups</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-topups-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: { title: { text: "Topup ($)" } },
                    colors: ["#8B5CF6"],
                  }}
                  series={[{ name: "Yearly Topup", data: yearlyTopups }]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingMonthTransaction ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-transactions-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: { title: { text: "Transaction ($)" } },
                    colors: ["#10B981"],
                  }}
                  series={[
                    { name: "Monthly Transaction", data: monthlyTransactions },
                  ]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTransaction ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-transactions-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: { title: { text: "Transaction ($)" } },
                    colors: ["#F59E0B"],
                  }}
                  series={[
                    { name: "Yearly Transaction", data: yearlyTransactions },
                  ]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}

          {loadingMonthTransferSender ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Transfers Sender</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-transfers-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: { title: { text: "Transfer ($)" } },
                    colors: ["#EC4899"],
                  }}
                  series={[
                    { name: "Monthly Transfer", data: monthlyTransfersSender },
                  ]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}

          {loadingYearTransferSender ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-transfers-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: { title: { text: "Transfer ($)" } },
                    colors: ["#6D28D9"],
                  }}
                  series={[
                    { name: "Yearly Transfer", data: yearlyTransfersSender },
                  ]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingMonthTransferReceiver ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Transfers Receiver</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-transfers-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: { title: { text: "Transfer ($)" } },
                    colors: ["#EC4899"],
                  }}
                  series={[
                    {
                      name: "Monthly Transfer",
                      data: monthlyTransfersReceiver,
                    },
                  ]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}

          {loadingYearTransferReceiver ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-transfers-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: { title: { text: "Transfer ($)" } },
                    colors: ["#6D28D9"],
                  }}
                  series={[
                    { name: "Yearly Transfer", data: yearlyTransfersReceiver },
                  ]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <TableCard
        search={search}
        setSearch={setSearch}
        isLoadingWithDelay={isLoadingWithDelay}
        loadingGetCards={loadingGetCards}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
