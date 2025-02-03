import {
  Repeat,
  FileText,
  ChevronDown,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableTransaction } from "@/components/admin/transaction";
import useListTransaction from "@/hooks/admin/transaction/ListTransaction";
import useTransactionStore from "@/store/transaction/transaction";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/helpers/debounce";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import ThemeChart from "@/components/ui/chart";
import { formatRupiah } from "@/helpers/formatRupiah";
import { MonthPicker, months } from "@/components/ui/monthpicker";
import { YearPicker } from "@/components/ui/yearpicker";

export default function DashboardTransactions() {
  const { toast } = useToast();
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

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
    loadingGetTransactions,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
    showModal,
  } = useListTransaction();

  const {
    findMonthStatusSuccess,
    monthStatusSuccess,
    loadingMonthStatusSuccess,
    errorMonthStatusSuccess,
    setLoadingMonthStatusSuccess,
    setErrorMonthStatusSuccess,

    findYearStatusSuccess,
    yearStatusSuccess,
    loadingYearStatusSuccess,
    errorYearStatusSuccess,
    setLoadingYearStatusSuccess,
    setErrorYearStatusSuccess,

    findMonthStatusFailed,
    monthStatusFailed,
    loadingMonthStatusFailed,
    errorMonthStatusFailed,
    setLoadingMonthStatusFailed,
    setErrorMonthStatusFailed,

    findYearStatusFailed,
    yearStatusFailed,
    loadingYearStatusFailed,
    errorYearStatusFailed,
    setLoadingYearStatusFailed,
    setErrorYearStatusFailed,

    findMonthTransactionMethod,
    monthTransactionMethod,
    loadingMonthTransactionMethod,
    errorMonthTransactionMethod,
    setLoadingMonthTransactionMethod,
    setErrorMonthTransactionMethod,

    findYearTransactionMethod,
    yearTransactionMethod,
    loadingYearTransactionMethod,
    setLoadingYearTransactionMethod,
    setErrorYearTransactionMethod,

    findMonthTransactionAmount,
    monthTransactionAmount,
    loadingMonthTransactionAmount,
    errorMonthTransactionAmount,
    setLoadingMonthTransactionAmount,
    setErrorMonthTransactionAmount,

    findYearTransactionAmount,
    yearTransactionAmount,
    loadingYearTransactionAmount,
    setLoadingYearTransactionAmount,
    setErrorYearTransactionAmount,
  } = useTransactionStore();

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

  const getUniqueMethods = (data: any, key: any) => {
    return Array.from(new Set(data.map((item: any) => item[key])));
  };

  const initializeDataByMethod = (methods: any, length: any) => {
    return methods.map((method: any) => ({
      name: method.toUpperCase(),
      data: Array(length).fill(0),
    }));
  };

  const monthlyPaymentMethod = useMemo(() => {
    if (!monthTransactionMethod?.length) return [];

    const year = new Date().getFullYear();
    const methods = getUniqueMethods(monthTransactionMethod, "payment_method");
    const dataByMethod = initializeDataByMethod(methods, 12);

    monthTransactionMethod.forEach((item) => {
      const monthIndex = new Date(`${item.month} 1, ${year}`).getMonth();
      const methodIndex = methods.indexOf(item.payment_method);
      if (methodIndex !== -1) {
        dataByMethod[methodIndex].data[monthIndex] = item.total_amount || 0;
      }
    });

    return dataByMethod;
  }, [monthTransactionMethod]);

  const yearlyPaymentMethod = useMemo(() => {
    if (!yearTransactionMethod?.length) return [];

    const methods = getUniqueMethods(yearTransactionMethod, "payment_method");
    const dataByMethod = initializeDataByMethod(methods, 5);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    yearTransactionMethod.forEach((item) => {
      const yearIndex = years.indexOf(Number(item.year));
      const methodIndex = methods.indexOf(item.payment_method);
      if (yearIndex !== -1 && methodIndex !== -1) {
        dataByMethod[methodIndex].data[yearIndex] = item.total_amount;
      }
    });

    return dataByMethod;
  }, [yearTransactionMethod]);

  const monthlyAmount = useMemo(() => {
    if (!monthTransactionAmount || !Array.isArray(monthTransactionAmount)) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransactionAmount.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_amount !== undefined) {
        balances[monthIndex] = balance.total_amount;
      }
    });

    return balances;
  }, [monthTransactionAmount]);

  const yearlyAmount = useMemo(() => {
    if (!yearTransactionAmount || !Array.isArray(yearTransactionAmount)) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearTransactionAmount.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearTransactionAmount]);

  const fetchMonthlySuccess = useCallback(
    async (year: number, month: number) => {
      try {
        setLoadingMonthStatusSuccess(true);
        setErrorMonthStatusSuccess(null);

        await findMonthStatusSuccess(toast, year, month);
      } catch (error) {
        setErrorMonthStatusSuccess("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthStatusSuccess(false);
      }
    },
    [
      findMonthStatusSuccess,
      setLoadingMonthStatusSuccess,
      setErrorMonthStatusSuccess,
    ],
  );

  const fetchYearlySuccess = useCallback(
    async (year: number) => {
      try {
        setLoadingYearStatusSuccess(true);
        setErrorYearStatusSuccess(null);

        await findYearStatusSuccess(toast, year);
      } catch (error) {
        setErrorYearStatusSuccess("Failed to fetch yearly balance");
      } finally {
        setLoadingYearStatusSuccess(false);
      }
    },
    [
      findYearStatusSuccess,
      setLoadingYearStatusSuccess,
      setLoadingYearStatusSuccess,
    ],
  );

  const fetchMonthlyFailed = useCallback(
    async (year: number, month: number) => {
      try {
        setLoadingMonthStatusFailed(true);
        setErrorMonthStatusFailed(null);

        await findMonthStatusFailed(toast, year, month);
      } catch (error) {
        setErrorMonthStatusFailed("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthStatusFailed(false);
      }
    },
    [
      findMonthStatusFailed,
      setLoadingMonthStatusFailed,
      setErrorMonthStatusFailed,
    ],
  );

  const fetchYearlyFailed = useCallback(
    async (year: number) => {
      try {
        setLoadingYearStatusFailed(true);
        setErrorYearStatusFailed(null);

        await findYearStatusFailed(toast, year);
      } catch (error) {
        setErrorYearStatusFailed("Failed to fetch yearly balance");
      } finally {
        setLoadingYearStatusFailed(false);
      }
    },
    [
      findYearStatusFailed,
      setLoadingYearStatusFailed,
      setLoadingYearStatusFailed,
    ],
  );

  const fetchMonthlyPaymentMethod = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTransactionMethod(true);
        setErrorMonthTransactionMethod(null);

        await findMonthTransactionMethod(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTransactionMethod(
          "Failed to fetch monthly payment method",
        );
      } finally {
        setLoadingMonthTransactionMethod(false);
      }
    },
    [
      findMonthTransactionMethod,
      setLoadingMonthTransactionMethod,
      setErrorMonthTransactionMethod,
    ],
  );

  const fetchYearlyPaymentMethod = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTransactionMethod(true);
        setErrorYearTransactionMethod(null);

        await findYearTransactionMethod(toast, year);
      } catch (error) {
        setErrorYearTransactionMethod("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTransactionMethod(false);
      }
    },
    [
      findYearTransactionMethod,
      setLoadingYearTransactionMethod,
      setErrorYearTransactionMethod,
    ],
  );

  const fetchMonthlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTransactionAmount(true);
        setErrorMonthTransactionAmount(null);

        await findMonthTransactionAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTransactionAmount(
          "Failed to fetch monthly payment method",
        );
      } finally {
        setLoadingMonthTransactionAmount(false);
      }
    },
    [
      findMonthTransactionAmount,
      setLoadingMonthTransactionAmount,
      setErrorMonthTransactionAmount,
    ],
  );

  const fetchYearlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTransactionAmount(true);
        setErrorYearTransactionAmount(null);

        await findYearTransactionAmount(toast, year);
      } catch (error) {
        setErrorYearTransactionAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTransactionAmount(false);
      }
    },
    [
      findYearTransactionAmount,
      setLoadingYearTransactionAmount,
      setErrorYearTransactionAmount,
    ],
  );

  const debouncedFetchMonthlyFailed = debounce(fetchMonthlyFailed, 300);
  const debouncedFetchYearlyFailed = debounce(fetchYearlyFailed, 300);

  const debouncedFetchMonthlySuccess = debounce(fetchMonthlySuccess, 300);
  const debouncedFetchYearlySuccess = debounce(fetchYearlySuccess, 300);

  const debouncedFetchMonthlyPaymentMethod = debounce(
    fetchMonthlyPaymentMethod,
    300,
  );
  const debouncedFetchYearlyPaymentMethod = debounce(
    fetchYearlyPaymentMethod,
    300,
  );

  const debouncedFetchMonthlyAmount = debounce(fetchMonthlyAmount, 300);
  const debouncedFetchYearlyAmount = debounce(fetchYearlyAmount, 300);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        debouncedFetchMonthlySuccess(selectedYear, selectedMonth.number),
        debouncedFetchYearlySuccess(selectedYear),

        debouncedFetchMonthlyFailed(selectedYear, selectedMonth.number),
        debouncedFetchYearlyFailed(selectedYear),

        debouncedFetchMonthlyPaymentMethod(selectedYear),
        debouncedFetchYearlyPaymentMethod(selectedYear),
        debouncedFetchMonthlyAmount(selectedYear),
        debouncedFetchYearlyAmount(selectedYear),
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchMonthlyFailed.cancel();
      debouncedFetchYearlyFailed.cancel();

      debouncedFetchMonthlySuccess.cancel();
      debouncedFetchYearlySuccess.cancel();

      debouncedFetchMonthlyPaymentMethod.cancel();
      debouncedFetchYearlyPaymentMethod.cancel();
      debouncedFetchMonthlyAmount.cancel();
      debouncedFetchYearlyAmount.cancel();
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {loadingMonthTransactionMethod ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Payment Method</CardTitle>
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
                    colors: ["#6366F1", "#10B981", "#F59E0B"], // Warna untuk tiap metode pembayaran
                  }}
                  series={monthlyPaymentMethod}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTransactionMethod ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Payment Method</CardTitle>
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
                    colors: ["#6366F1", "#10B981", "#F59E0B"],
                  }}
                  series={yearlyPaymentMethod}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingMonthTransactionAmount ? (
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
                  series={[{ name: "Monthly Balance", data: monthlyAmount }]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTransactionAmount ? (
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
                  series={[{ name: "Yearly Amount", data: yearlyAmount }]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <TableTransaction
        search={search}
        setSearch={setSearch}
        isLoadingWithDelay={isLoadingWithDelay}
        loadingGetTransactions={loadingGetTransactions}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
