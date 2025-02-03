import { TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { YearPicker } from "@/components/ui/yearpicker";
import useListMerchant from "@/hooks/admin/merchant/ListMerchant";
import { TableMerchant } from "@/components/admin/merchant";
import useMerchantStore from "@/store/merchant/merchant";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/helpers/debounce";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import ThemeChart from "@/components/ui/chart";
import { formatRupiah } from "@/helpers/formatRupiah";
import { months, MonthPicker } from "@/components/ui/monthpicker";
import useListTransactionMerchant from "@/hooks/admin/merchant/ListTransactionMerchant";
import TableMerchantTransaction from "@/components/admin/merchant/table/transaction/table-merchant-transaction";

export default function DashboardMerchant() {
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
    table: merchantTable,
    search: merchantSearch,
    setSearch: setMerchantSearch,
    loadingGetMerchants,
    pagination: merchantPagination,
    handlePageChange: handleMerchantPageChange,
    handlePageSizeChange: handleMerchantPageSizeChange,
    isLoadingWithDelay: isMerchantLoadingWithDelay,
    showModal: showMerchantModal,
  } = useListMerchant();

  const {
    table: transactionTable,
    search: transactionSearch,
    setSearch: setTransactionSearch,
    loadingGetTransactions,
    pagination: transactionPagination,
    handlePageChange: handleTransactionPageChange,
    handlePageSizeChange: handleTransactionPageSizeChange,
    isLoadingWithDelay: isTransactionLoadingWithDelay,
  } = useListTransactionMerchant();

  const {
    findMonthTotalAmount,
    monthTotalAmount,
    loadingMonthTotalAmount,
    errorMonthTotalAmount,
    setLoadingMonthTotalAmount,
    setErrorMonthTotalAmount,

    findYearTotalAmount,
    yearTotalAmount,
    loadingYearTotalAmount,
    errorYearTotalAmount,
    setLoadingYearTotalAmount,
    setErrorYearTotalAmount,

    findMonthPaymentMethod,
    monthPaymentMethod,
    loadingMonthPaymentMethod,
    errorMonthPaymentMethod,
    setLoadingMonthPaymentMethod,
    setErrorMonthPaymentMethod,

    findYearPaymentMethod,
    yearPaymentMethod,
    loadingYearPaymentMethod,
    errorYearPaymentMethod,
    setLoadingYearPaymentMethod,
    setErrorYearPaymentMethod,

    findMonthAmount,
    monthAmount,
    loadingMonthAmount,
    errorMonthAmount,
    setLoadingMonthAmount,
    setErrorMonthAmount,

    findYearAmount,
    yearAmount,
    loadingYearAmount,
    errorYearAmount,
    setLoadingYearAmount,
    setErrorYearAmount,
  } = useMerchantStore();

  const { toast } = useToast();

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
  };
  const handleMonthChange = (month: { name: string; number: number }) => {
    setSelectedMonth(month);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonths = currentDate.getMonth();

  const previousMonth = currentMonths === 0 ? 11 : currentMonths - 1;
  const previousYear = currentMonths === 0 ? currentYear - 1 : currentYear;

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

  const calculatePercentageChange = (
    current: number,
    previous: number,
  ): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const currentMonthData =
    monthTotalAmount && Array.isArray(monthTotalAmount)
      ? monthTotalAmount.find(
          (balance) =>
            balance.month === monthNames[currentMonths] &&
            balance.year === currentYear.toString(),
        )
      : null;

  const previousMonthData =
    monthTotalAmount && Array.isArray(monthTotalAmount)
      ? monthTotalAmount.find(
          (balance) =>
            balance.month === monthNames[previousMonth] &&
            balance.year === previousYear.toString(),
        )
      : null;

  const currentMonthBalance = currentMonthData?.total_amount || 0;
  const previousMonthBalance = previousMonthData?.total_amount || 0;

  const monthPercentageChange = calculatePercentageChange(
    currentMonthBalance,
    previousMonthBalance,
  );

  const currentYearData =
    yearTotalAmount && Array.isArray(yearTotalAmount)
      ? yearTotalAmount.find(
          (balance) => balance.year === currentYear.toString(),
        )
      : null;

  const previousYearData =
    yearTotalAmount && Array.isArray(yearTotalAmount)
      ? yearTotalAmount.find(
          (balance) => balance.year === (currentYear - 1).toString(),
        )
      : null;

  const currentYearBalance = currentYearData?.total_amount || 0;
  const previousYearBalance = previousYearData?.total_amount || 0;

  console.log("example month", monthTotalAmount);

  const yearPercentageChange = calculatePercentageChange(
    currentYearBalance,
    previousYearBalance,
  );

  const monthlyPaymentMethod = useMemo(() => {
    if (!monthPaymentMethod || !Array.isArray(monthPaymentMethod)) {
      return [];
    }

    const year = new Date().getFullYear();
    const methods = new Set(
      monthPaymentMethod.map((item) => item.payment_method),
    );
    const dataByMethod = Array.from(methods).map((method) => ({
      name: method.toUpperCase(),
      data: Array(12).fill(0),
    }));

    monthPaymentMethod.forEach((item) => {
      const monthIndex = new Date(`${item.month} 1, ${year}`).getMonth();
      const methodIndex = Array.from(methods).indexOf(item.payment_method);
      if (methodIndex !== -1 && item.total_amount !== undefined) {
        dataByMethod[methodIndex].data[monthIndex] = item.total_amount;
      }
    });

    return dataByMethod;
  }, [monthPaymentMethod]);

  const yearlyPaymentMethod = useMemo(() => {
    if (!yearPaymentMethod || !Array.isArray(yearPaymentMethod)) {
      return [];
    }

    const methods = new Set(
      yearPaymentMethod.map((item) => item.payment_method),
    );
    const dataByMethod = Array.from(methods).map((method) => ({
      name: method.toUpperCase(),
      data: Array(5).fill(0),
    }));

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    yearPaymentMethod.forEach((item) => {
      const yearIndex = years.indexOf(Number(item.year));
      const methodIndex = Array.from(methods).indexOf(item.payment_method);
      if (yearIndex !== -1 && methodIndex !== -1) {
        dataByMethod[methodIndex].data[yearIndex] = item.total_amount || 0;
      }
    });

    return dataByMethod;
  }, [yearPaymentMethod]);

  const monthlyAmount = useMemo(() => {
    if (!monthAmount || !Array.isArray(monthAmount)) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthAmount.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_amount !== undefined) {
        balances[monthIndex] = balance.total_amount;
      }
    });

    return balances;
  }, [monthAmount]);

  const yearlyAmount = useMemo(() => {
    if (!yearAmount || !Array.isArray(yearAmount)) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearAmount.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearAmount]);

  const fetchMonthlyTotalbalance = useCallback(
    async (year: number, month: number) => {
      try {
        setLoadingMonthTotalAmount(true);
        setErrorMonthTotalAmount(null);

        await findMonthTotalAmount(toast, year, month);
      } catch (error) {
        setErrorMonthTotalAmount("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthTotalAmount(false);
      }
    },
    [
      findMonthTotalAmount,
      setLoadingMonthTotalAmount,
      setErrorMonthTotalAmount,
    ],
  );

  const fetchYearlyTotalBalance = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTotalAmount(true);
        setErrorYearTotalAmount(null);

        await findYearTotalAmount(toast, year);
      } catch (error) {
        setErrorYearTotalAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTotalAmount(false);
      }
    },
    [findYearTotalAmount, setLoadingYearTotalAmount, setErrorYearTotalAmount],
  );

  const fetchMonthlyPaymentMethod = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthPaymentMethod(true);
        setErrorMonthPaymentMethod(null);

        await findMonthPaymentMethod(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthPaymentMethod("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthPaymentMethod(false);
      }
    },
    [
      findMonthPaymentMethod,
      setLoadingMonthPaymentMethod,
      setErrorMonthPaymentMethod,
    ],
  );

  const fetchYearlyPaymentMethod = useCallback(
    async (year: number) => {
      try {
        setLoadingYearPaymentMethod(true);
        setErrorYearPaymentMethod(null);

        await findYearPaymentMethod(toast, year);
      } catch (error) {
        setErrorYearPaymentMethod("Failed to fetch yearly balance");
      } finally {
        setLoadingYearPaymentMethod(false);
      }
    },
    [
      findYearPaymentMethod,
      setLoadingYearPaymentMethod,
      setErrorYearPaymentMethod,
    ],
  );

  const fetchMonthlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthAmount(true);
        setErrorMonthAmount(null);

        await findMonthAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthAmount("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthAmount(false);
      }
    },
    [findMonthAmount, setLoadingMonthAmount, setErrorMonthAmount],
  );

  const fetchYearlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingYearAmount(true);
        setErrorYearAmount(null);

        await findYearAmount(toast, year);
      } catch (error) {
        setErrorYearAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearAmount(false);
      }
    },
    [findYearAmount, setLoadingYearAmount, setErrorYearAmount],
  );

  const debouncedFetchMonthlyTotalBalance = debounce(
    fetchMonthlyTotalbalance,
    300,
  );
  const debouncedFetchYearlyTotalBalance = debounce(
    fetchYearlyTotalBalance,
    300,
  );

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
        debouncedFetchMonthlyPaymentMethod(selectedYear),
        debouncedFetchYearlyPaymentMethod(selectedYear),
        debouncedFetchMonthlyAmount(selectedYear),
        debouncedFetchYearlyAmount(selectedYear),
        debouncedFetchMonthlyTotalBalance(selectedYear, selectedMonth.number),
        debouncedFetchYearlyTotalBalance(selectedYear),
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchMonthlyPaymentMethod.cancel();
      debouncedFetchYearlyPaymentMethod.cancel();
      debouncedFetchMonthlyAmount.cancel();
      debouncedFetchYearlyAmount.cancel();
      debouncedFetchMonthlyTotalBalance.cancel();
      debouncedFetchYearlyTotalBalance.cancel();
    };
  }, [selectedYear, selectedMonth]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-10">
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Amount Month
            </CardTitle>
            <Wallet className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthData
                ? formatRupiah(currentMonthBalance)
                : "Data tidak tersedia"}
            </div>
            <p className="text-sm text-muted-foreground">
              {previousMonthData
                ? `${monthPercentageChange >= 0 ? "↑" : "↓"} ${Math.abs(monthPercentageChange).toFixed(2)}% dari bulan sebelumnya`
                : "Tidak ada data bulan sebelumnya"}
            </p>
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Amount Year
            </CardTitle>
            <TrendingDown className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentYearData
                ? formatRupiah(currentYearBalance)
                : "Data tidak tersedia"}
            </div>
            {currentYearData && previousYearData ? (
              <p className="text-sm text-muted-foreground">
                {yearPercentageChange >= 0 ? "↑" : "↓"}{" "}
                {Math.abs(yearPercentageChange).toFixed(2)}% dari tahun
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
          {loadingMonthPaymentMethod ? (
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
          {loadingYearPaymentMethod ? (
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
          {loadingMonthAmount ? (
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
          {loadingYearAmount ? (
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

      <TableMerchant
        search={merchantSearch}
        setSearch={setMerchantSearch}
        isLoadingWithDelay={isMerchantLoadingWithDelay}
        loadingGetMerchants={loadingGetMerchants}
        table={merchantTable}
        pagination={merchantPagination}
        handlePageChange={handleMerchantPageChange}
        handlePageSizeChange={handleMerchantPageSizeChange}
      />

      <TableMerchantTransaction
        search={transactionSearch}
        setSearch={setTransactionSearch}
        isLoadingWithDelay={isTransactionLoadingWithDelay}
        loadingGetTransactions={loadingGetTransactions}
        table={transactionTable}
        pagination={transactionPagination}
        handlePageChange={handleTransactionPageChange}
        handlePageSizeChange={handleTransactionPageSizeChange}
      />
    </div>
  );
}
