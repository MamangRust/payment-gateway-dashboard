import { Wallet, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableTransfer } from "@/components/admin/transfer";
import useListTransfer from "@/hooks/admin/transfer/ListTransfer";
import useTransferStore from "@/store/transfer/transfer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/helpers/debounce";
import { formatRupiah } from "@/helpers/formatRupiah";
import ThemeChart from "@/components/ui/chart";
import { MonthPicker, months } from "@/components/ui/monthpicker";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import { YearPicker } from "@/components/ui/yearpicker";
import { useParams } from "react-router-dom";

export default function TransferDetail() {
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

  const params = useParams();

  const card_number = params.card_number;

  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex];

  const [selectedMonth, setSelectedMonth] = useState<{
    name: string;
    number: number;
  }>({
    name: currentMonth.value,
    number: currentMonth.number,
  });
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  const {
    table,
    search,
    setSearch,
    loadingGetTransfers,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
    showModal,
  } = useListTransfer({ card_number: card_number });

  const { toast } = useToast();

  const {
    findMonthStatusSuccessByCardNumber,
    monthStatusSuccess,
    loadingMonthStatusSuccess,
    errorMonthStatusSuccess,
    setLoadingMonthStatusSuccess,
    setErrorMonthStatusSuccess,

    findYearStatusSuccessByCardNumber,
    yearStatusSuccess,
    loadingYearStatusSuccess,
    errorYearStatusSuccess,
    setLoadingYearStatusSuccess,
    setErrorYearStatusSuccess,

    findMonthStatusFailedByCardNumber,
    monthStatusFailed,
    loadingMonthStatusFailed,
    errorMonthStatusFailed,
    setLoadingMonthStatusFailed,
    setErrorMonthStatusFailed,

    findYearStatusFailedByCardNumber,
    yearStatusFailed,
    loadingYearStatusFailed,
    errorYearStatusFailed,
    setLoadingYearStatusFailed,
    setErrorYearStatusFailed,

    findMonthTransferAmountBySender,
    monthTransferAmountSender,
    loadingMonthTransferAmountSender,
    errorMonthTransferAmountSender,
    setLoadingMonthTransferAmountSender,
    setErrorMonthTransferAmountSender,

    findMonthTransferAmountByReceiver,
    monthTransferAmountReceiver,
    loadingMonthTransferAmountReceiver,
    errorMonthTransferAmountReceiver,
    setLoadingMonthTransferAmountReceiver,
    setErrorMonthTransferAmountReceiver,

    findYearTransferAmountBySender,
    yearTransferAmountSender,
    loadingYearTransferAmountSender,
    setLoadingYearTransferAmountSender,
    setErrorYearTransferAmountSender,

    findYearTransferAmountByReceiver,
    yearTransferAmountReceiver,
    loadingYearTransferAmountReceiver,
    setLoadingYearTransferAmountReceiver,
    setErrorYearTransferAmountReceiver,
  } = useTransferStore();

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
  };

  const handleMonthChange = (month: { name: string; number: number }) => {
    setSelectedMonth(month);
  };

  const monthNames = [
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
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonths = currentDate.getMonth();

  const previousMonth = currentMonths === 0 ? 11 : currentMonths - 1;
  const previousYear = currentMonths === 0 ? currentYear - 1 : currentYear;

  const calculatePercentageChange = (
    current: number,
    previous: number,
  ): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const currentMonthSuccessData =
    monthStatusSuccess && Array.isArray(monthStatusSuccess)
      ? monthStatusSuccess.find(
          (balance) =>
            balance.month === monthNames[currentMonths] &&
            balance.year === currentYear.toString(),
        )
      : null;

  const previousMonthSuccessData =
    monthStatusSuccess && Array.isArray(monthStatusSuccess)
      ? monthStatusSuccess?.find(
          (balance) =>
            balance.month === monthNames[previousMonth] &&
            balance.year === previousYear.toString(),
        )
      : null;

  const currentMonthSuccess = currentMonthSuccessData?.total_amount || 0;
  const previousMonthSuccess = previousMonthSuccessData?.total_amount || 0;

  const monthPercentageSuccessChange = calculatePercentageChange(
    currentMonthSuccess,
    previousMonthSuccess,
  );

  const currentYearSuccessData =
    yearStatusSuccess && Array.isArray(yearStatusSuccess)
      ? yearStatusSuccess.find(
          (balance) => balance.year === currentYear.toString(),
        )
      : null;

  const previousYearSuccessData =
    yearStatusSuccess && Array.isArray(yearStatusSuccess)
      ? yearStatusSuccess.find(
          (balance) => balance.year === (currentYear - 1).toString(),
        )
      : null;

  const currentYearSuccess = currentYearSuccessData?.total_amount || 0;
  const previousYearSucces = previousYearSuccessData?.total_amount || 0;

  const yearPercentageSuccessChange = calculatePercentageChange(
    currentYearSuccess,
    previousYearSucces,
  );

  const currentMonthFailedData =
    monthStatusFailed && Array.isArray(monthStatusFailed)
      ? monthStatusFailed.find(
          (balance) =>
            balance.month === monthNames[currentMonths] &&
            balance.year === currentYear.toString(),
        )
      : null;

  const previousMonthFailedData =
    monthStatusFailed && Array.isArray(monthStatusFailed)
      ? monthStatusFailed?.find(
          (balance) =>
            balance.month === monthNames[previousMonth] &&
            balance.year === previousYear.toString(),
        )
      : null;

  const currentMonthFailed = currentMonthFailedData?.total_amount || 0;
  const previousMonthFailed = previousMonthFailedData?.total_amount || 0;

  const monthPercentageFailedChange = calculatePercentageChange(
    currentMonthFailed,
    previousMonthFailed,
  );

  const currentYearFailedData =
    yearStatusFailed && Array.isArray(yearStatusFailed)
      ? yearStatusFailed.find(
          (balance) => balance.year === currentYear.toString(),
        )
      : null;

  const previousYearFailedData =
    yearStatusFailed && Array.isArray(yearStatusFailed)
      ? yearStatusFailed.find(
          (balance) => balance.year === (currentYear - 1).toString(),
        )
      : null;

  const currentYearFailed = currentYearFailedData?.total_amount || 0;
  const previousYearFailed = previousYearFailedData?.total_amount || 0;

  const yearPercentageFailedChange = calculatePercentageChange(
    currentYearFailed,
    previousYearFailed,
  );

  const monthlyAmountSender = useMemo(() => {
    if (
      !monthTransferAmountSender ||
      !Array.isArray(monthTransferAmountSender)
    ) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransferAmountSender.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_amount !== undefined) {
        balances[monthIndex] = balance.total_amount;
      }
    });

    return balances;
  }, [monthTransferAmountSender]);

  const yearlyAmountSender = useMemo(() => {
    if (!yearTransferAmountSender || !Array.isArray(yearTransferAmountSender)) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearTransferAmountSender.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearTransferAmountSender]);

  const monthlyAmountReceiver = useMemo(() => {
    if (
      !monthTransferAmountReceiver ||
      !Array.isArray(monthTransferAmountReceiver)
    ) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransferAmountReceiver.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_amount !== undefined) {
        balances[monthIndex] = balance.total_amount;
      }
    });

    return balances;
  }, [monthTransferAmountReceiver]);

  const yearlyAmountReceiver = useMemo(() => {
    if (
      !yearTransferAmountReceiver ||
      !Array.isArray(yearTransferAmountReceiver)
    ) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearTransferAmountReceiver.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearTransferAmountReceiver]);

  const fetchMonthlySuccess = useCallback(
    async (year: number, month: number, cardNumber: string) => {
      try {
        setLoadingMonthStatusSuccess(true);
        setErrorMonthStatusSuccess(null);

        await findMonthStatusSuccessByCardNumber(
          toast,
          year,
          month,
          cardNumber,
        );
      } catch (error) {
        setErrorMonthStatusSuccess("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthStatusSuccess(false);
      }
    },
    [
      findMonthStatusSuccessByCardNumber,
      setLoadingMonthStatusSuccess,
      setErrorMonthStatusSuccess,
    ],
  );

  const fetchYearlySuccess = useCallback(
    async (year: number, cardNumber: string) => {
      try {
        setLoadingYearStatusSuccess(true);
        setErrorYearStatusSuccess(null);

        await findYearStatusSuccessByCardNumber(toast, year, cardNumber);
      } catch (error) {
        setErrorYearStatusSuccess("Failed to fetch yearly balance");
      } finally {
        setLoadingYearStatusSuccess(false);
      }
    },
    [
      findYearStatusSuccessByCardNumber,
      setLoadingYearStatusSuccess,
      setLoadingYearStatusSuccess,
    ],
  );

  const fetchMonthlyFailed = useCallback(
    async (year: number, month: number, cardNumber: string) => {
      try {
        setLoadingMonthStatusFailed(true);
        setErrorMonthStatusFailed(null);

        await findMonthStatusFailedByCardNumber(toast, year, month, cardNumber);
      } catch (error) {
        setErrorMonthStatusFailed("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthStatusFailed(false);
      }
    },
    [
      findMonthStatusFailedByCardNumber,
      setLoadingMonthStatusFailed,
      setErrorMonthStatusFailed,
    ],
  );

  const fetchYearlyFailed = useCallback(
    async (year: number, cardNumber: string) => {
      try {
        setLoadingYearStatusFailed(true);
        setErrorYearStatusFailed(null);

        await findYearStatusFailedByCardNumber(toast, year, cardNumber);
      } catch (error) {
        setErrorYearStatusFailed("Failed to fetch yearly balance");
      } finally {
        setLoadingYearStatusFailed(false);
      }
    },
    [
      findYearStatusFailedByCardNumber,
      setLoadingYearStatusFailed,
      setLoadingYearStatusFailed,
    ],
  );

  const fetchMonthlyAmountSender = useCallback(
    async (year: number, cardNumber: string) => {
      try {
        setLoadingMonthTransferAmountSender(true);
        setErrorMonthTransferAmountSender(null);

        await findMonthTransferAmountBySender(toast, year, cardNumber);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTransferAmountSender(
          "Failed to fetch monthly payment method",
        );
      } finally {
        setLoadingMonthTransferAmountSender(false);
      }
    },
    [
      findMonthTransferAmountBySender,
      setLoadingMonthTransferAmountSender,
      setErrorMonthTransferAmountSender,
    ],
  );

  const fetchYearlyAmountSender = useCallback(
    async (year: number, cardNumber: string) => {
      try {
        setLoadingYearTransferAmountSender(true);
        setErrorYearTransferAmountSender(null);

        await findYearTransferAmountBySender(toast, year, cardNumber);
      } catch (error) {
        setErrorYearTransferAmountSender("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTransferAmountSender(false);
      }
    },
    [
      findYearTransferAmountBySender,
      setLoadingYearTransferAmountSender,
      setErrorYearTransferAmountSender,
    ],
  );

  const fetchMonthlyAmountReceiver = useCallback(
    async (year: number, cardNumber: string) => {
      try {
        setLoadingMonthTransferAmountReceiver(true);
        setErrorMonthTransferAmountReceiver(null);

        await findMonthTransferAmountByReceiver(toast, year, cardNumber);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTransferAmountReceiver(
          "Failed to fetch monthly payment method",
        );
      } finally {
        setLoadingMonthTransferAmountReceiver(false);
      }
    },
    [
      findMonthTransferAmountByReceiver,
      setLoadingMonthTransferAmountReceiver,
      setErrorMonthTransferAmountReceiver,
    ],
  );

  const fetchYearlyAmountReceiver = useCallback(
    async (year: number, cardNumber: string) => {
      try {
        setLoadingYearTransferAmountReceiver(true);
        setErrorYearTransferAmountReceiver(null);

        await findYearTransferAmountByReceiver(toast, year, cardNumber);
      } catch (error) {
        setErrorYearTransferAmountReceiver("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTransferAmountReceiver(false);
      }
    },
    [
      findYearTransferAmountByReceiver,
      setLoadingYearTransferAmountReceiver,
      setErrorYearTransferAmountReceiver,
    ],
  );

  const debouncedFetchMonthlyFailed = debounce(fetchMonthlyFailed, 300);
  const debouncedFetchYearlyFailed = debounce(fetchYearlyFailed, 300);

  const debouncedFetchMonthlySuccess = debounce(fetchMonthlySuccess, 300);
  const debouncedFetchYearlySuccess = debounce(fetchYearlySuccess, 300);

  const debouncedFetchMonthlyAmountSender = debounce(
    fetchMonthlyAmountSender,
    300,
  );
  const debouncedFetchYearlyAmountSender = debounce(
    fetchYearlyAmountSender,
    300,
  );

  const debouncedFetchMonthlyAmountReceiver = debounce(
    fetchMonthlyAmountReceiver,
    300,
  );
  const debouncedFetchYearlyAmountReceiver = debounce(
    fetchYearlyAmountReceiver,
    300,
  );

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        debouncedFetchMonthlySuccess(
          selectedYear,
          selectedMonth.number,
          card_number,
        ),
        debouncedFetchYearlySuccess(selectedYear, card_number),

        debouncedFetchMonthlyFailed(
          selectedYear,
          selectedMonth.number,
          card_number,
        ),
        debouncedFetchYearlyFailed(selectedYear, card_number),

        debouncedFetchMonthlyAmountSender(selectedYear, card_number),
        debouncedFetchYearlyAmountSender(selectedYear, card_number),
        debouncedFetchMonthlyAmountReceiver(selectedYear, card_number),
        debouncedFetchYearlyAmountReceiver(selectedYear, card_number),
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchMonthlyFailed.cancel();
      debouncedFetchYearlyFailed.cancel();

      debouncedFetchMonthlySuccess.cancel();
      debouncedFetchYearlySuccess.cancel();

      debouncedFetchMonthlyAmountSender.cancel();
      debouncedFetchYearlyAmountSender.cancel();

      debouncedFetchMonthlyAmountReceiver.cancel();
      debouncedFetchYearlyAmountReceiver.cancel();
    };
  }, [selectedYear, selectedMonth]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-10">
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Month success</CardTitle>
            <Wallet className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthSuccess
                ? formatRupiah(currentMonthSuccess)
                : "Data tidak tersedia"}
            </div>
            <p className="text-sm text-muted-foreground">
              {previousMonthSuccess
                ? `${monthPercentageSuccessChange >= 0 ? "↑" : "↓"} ${Math.abs(monthPercentageSuccessChange).toFixed(2)}% dari bulan sebelumnya`
                : "Tidak ada data bulan sebelumnya"}
            </p>
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Year Success</CardTitle>
            <TrendingDown className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentYearSuccess
                ? formatRupiah(currentYearSuccess)
                : "Data tidak tersedia"}
            </div>
            {currentYearSuccess && previousYearSuccessData ? (
              <p className="text-sm text-muted-foreground">
                {yearPercentageSuccessChange >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(yearPercentageSuccessChange).toFixed(2)}% dari tahun
                sebelumnya
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tidak ada data tahun sebelumnya
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Month Failed</CardTitle>
            <Wallet className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthFailed
                ? formatRupiah(currentMonthFailed)
                : "Data tidak tersedia"}
            </div>
            <p className="text-sm text-muted-foreground">
              {previousMonthFailed
                ? `${monthPercentageFailedChange >= 0 ? "↑" : "↓"} ${Math.abs(monthPercentageFailedChange).toFixed(2)}% dari bulan sebelumnya`
                : "Tidak ada data bulan sebelumnya"}
            </p>
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Year Failed</CardTitle>
            <TrendingDown className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentYearFailed
                ? formatRupiah(currentYearFailed)
                : "Data tidak tersedia"}
            </div>
            {currentYearFailed && previousYearFailedData ? (
              <p className="text-sm text-muted-foreground">
                {yearPercentageFailedChange >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(yearPercentageFailedChange).toFixed(2)}% dari tahun
                sebelumnya
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Tidak ada data tahun sebelumnya
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-8 mt-4">
        <div className="flex justify-between">
          <div>
            <MonthPicker onMonthChange={handleMonthChange} />
          </div>

          <div>
            <YearPicker
              selectedYear={selectedYear}
              onYearChange={(date) => handleYearChange(date)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {loadingMonthTransferAmountSender ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-amount-chart",
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
                  series={[
                    { name: "Monthly Balance", data: monthlyAmountSender },
                  ]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTransferAmountSender ? (
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
                      id: "yearly-amount-chart",
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
                  series={[{ name: "Yearly Amount", data: yearlyAmountSender }]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {loadingMonthTransferAmountReceiver ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-amount-chart",
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
                  series={[
                    { name: "Monthly Balance", data: monthlyAmountReceiver },
                  ]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTransferAmountReceiver ? (
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
                      id: "yearly-amount-chart",
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
                  series={[
                    { name: "Yearly Amount", data: yearlyAmountReceiver },
                  ]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <TableTransfer
        search={search}
        setSearch={setSearch}
        isLoadingWithDelay={isLoadingWithDelay}
        loadingGetTransfers={loadingGetTransfers}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
