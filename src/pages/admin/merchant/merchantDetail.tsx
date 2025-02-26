import { TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { YearPicker } from "@/components/ui/yearpicker";
import useMerchantStore from "@/store/merchant/merchant";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { formatRupiah } from "@/helpers/formatRupiah";
import { months, MonthPicker } from "@/components/ui/monthpicker";
import { debounce } from "@/helpers/debounce";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import ThemeChart from "@/components/ui/chart";
import { useParams } from "react-router-dom";
import useListTransactionByMerchant from "@/hooks/admin/merchant/ListTransactionByMerchant";
import TableMerchantTransaction from "@/components/admin/merchant/table/transaction/table-merchant-transaction";

export default function MerchantDetail() {
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);
  const params = useParams();

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

  const merchant_id = params.merchant_id;

  const {
    findMonthTotalAmountByMerchant,
    monthTotalAmount,
    loadingMonthTotalAmount,
    errorMonthTotalAmount,
    setLoadingMonthTotalAmount,
    setErrorMonthTotalAmount,

    findYearTotalAmountByMerchant,
    yearTotalAmount,
    loadingYearTotalAmount,
    errorYearTotalAmount,
    setLoadingYearTotalAmount,
    setErrorYearTotalAmount,

    findMonthPaymentMethodByMerchant,
    monthPaymentMethod,
    loadingMonthPaymentMethod,
    errorMonthPaymentMethod,
    setLoadingMonthPaymentMethod,
    setErrorMonthPaymentMethod,

    findYearPaymentMethodByMerchant,
    yearPaymentMethod,
    loadingYearPaymentMethod,
    errorYearPaymentMethod,
    setLoadingYearPaymentMethod,
    setErrorYearPaymentMethod,

    findMonthAmountByMerchant,
    monthAmount,
    loadingMonthAmount,
    errorMonthAmount,
    setLoadingMonthAmount,
    setErrorMonthAmount,

    findYearAmountByMerchant,
    yearAmount,
    loadingYearAmount,
    errorYearAmount,
    setLoadingYearAmount,
    setErrorYearAmount,
  } = useMerchantStore();

  const {
    table: transactionTable,
    search: transactionSearch,
    setSearch: setTransactionSearch,
    loadingGetTransactions,
    pagination: transactionPagination,
    handlePageChange: handleTransactionPageChange,
    handlePageSizeChange: handleTransactionPageSizeChange,
    isLoadingWithDelay: isTransactionLoadingWithDelay,
  } = useListTransactionByMerchant({ merchant_id: Number(merchant_id!) });

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
    async (year: number, month: number, merchant_id: number) => {
      try {
        setLoadingMonthTotalAmount(true);
        setErrorMonthTotalAmount(null);

        await findMonthTotalAmountByMerchant(toast, year, month, merchant_id);
      } catch (error) {
        setErrorMonthTotalAmount("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthTotalAmount(false);
      }
    },
    [
      findMonthTotalAmountByMerchant,
      setLoadingMonthTotalAmount,
      setErrorMonthTotalAmount,
    ],
  );

  const fetchYearlyTotalBalance = useCallback(
    async (year: number, merchant_id: number) => {
      try {
        setLoadingYearTotalAmount(true);
        setErrorYearTotalAmount(null);

        await findYearTotalAmountByMerchant(toast, year, merchant_id);
      } catch (error) {
        setErrorYearTotalAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTotalAmount(false);
      }
    },
    [
      findYearTotalAmountByMerchant,
      setLoadingYearTotalAmount,
      setErrorYearTotalAmount,
    ],
  );

  const fetchMonthlyPaymentMethod = useCallback(
    async (year: number, merchant_id: number) => {
      try {
        setLoadingMonthPaymentMethod(true);
        setErrorMonthPaymentMethod(null);

        await findMonthPaymentMethodByMerchant(toast, year, merchant_id);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthPaymentMethod("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthPaymentMethod(false);
      }
    },
    [
      findMonthPaymentMethodByMerchant,
      setLoadingMonthPaymentMethod,
      setErrorMonthPaymentMethod,
    ],
  );

  const fetchYearlyPaymentMethod = useCallback(
    async (year: number, merchant_id: number) => {
      try {
        setLoadingYearPaymentMethod(true);
        setErrorYearPaymentMethod(null);

        await findYearPaymentMethodByMerchant(toast, year, merchant_id);
      } catch (error) {
        setErrorYearPaymentMethod("Failed to fetch yearly balance");
      } finally {
        setLoadingYearPaymentMethod(false);
      }
    },
    [
      findYearPaymentMethodByMerchant,
      setLoadingYearPaymentMethod,
      setErrorYearPaymentMethod,
    ],
  );

  const fetchMonthlyAmount = useCallback(
    async (year: number, merchant_id: number) => {
      try {
        setLoadingMonthAmount(true);
        setErrorMonthAmount(null);

        await findMonthAmountByMerchant(toast, year, merchant_id);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthAmount("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthAmount(false);
      }
    },
    [findMonthAmountByMerchant, setLoadingMonthAmount, setErrorMonthAmount],
  );

  const fetchYearlyAmount = useCallback(
    async (year: number, merchant_id: number) => {
      try {
        setLoadingYearAmount(true);
        setErrorYearAmount(null);

        await findYearAmountByMerchant(toast, year, merchant_id);
      } catch (error) {
        setErrorYearAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearAmount(false);
      }
    },
    [findYearAmountByMerchant, setLoadingYearAmount, setErrorYearAmount],
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
        debouncedFetchMonthlyPaymentMethod(selectedYear, merchant_id),
        debouncedFetchYearlyPaymentMethod(selectedYear, merchant_id),
        debouncedFetchMonthlyAmount(selectedYear, merchant_id),
        debouncedFetchYearlyAmount(selectedYear, merchant_id),
        debouncedFetchMonthlyTotalBalance(
          selectedYear,
          selectedMonth.number,
          merchant_id,
        ),
        debouncedFetchYearlyTotalBalance(selectedYear, merchant_id),
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
                    colors: ["#6366F1", "#10B981", "#F59E0B"],
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
