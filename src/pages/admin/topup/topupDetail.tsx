import { Wallet, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCallback, useEffect, useMemo, useState } from "react";
import useListTopup from "@/hooks/admin/topup/ListTopup";
import { TableTopup } from "@/components/admin/topup";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/helpers/debounce";
import ThemeChart from "@/components/ui/chart";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import { formatRupiah } from "@/helpers/formatRupiah";
import { YearPicker } from "@/components/ui/yearpicker";
import useTopupStore from "@/store/topup/topup";
import { MonthPicker, months } from "@/components/ui/monthpicker";
import { useParams } from "react-router-dom";
import useListTopupCardNumber from "@/hooks/admin/topup/ListTopupCardNumber";

export default function TopupDetail() {
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

  const params = useParams();

  const card_number = params.card_number;

  const { toast } = useToast();

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
    loadingGetCardNumberTopup,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
  } = useListTopupCardNumber({ card_number: card_number! });

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

    findMonthTopupMethodCard,
    monthTopupMethod,
    loadingMonthTopupMethod,
    errorMonthTopupMethod,
    setLoadingMonthTopupMethod,
    setErrorMonthTopupMethod,

    findYearTopupMethodCard,
    yearTopupMethod,
    loadingYearTopupMethod,
    setLoadingYearTopupMethod,
    setErrorYearTopupMethod,

    findMonthTopupAmountCard,
    monthTopupAmount,
    loadingMonthTopupAmount,
    errorMonthTopupAmount,
    setLoadingMonthTopupAmount,
    setErrorMonthTopupAmount,

    findYearTopupAmountCard,
    yearTopupAmount,
    loadingYearTopupAmount,
    setLoadingYearTopupAmount,
    setErrorYearTopupAmount,
  } = useTopupStore();

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

  const currentMonthSuccessData = monthStatusSuccess?.find(
    (balance) =>
      balance.month === monthNames[currentMonths] &&
      balance.year === currentYear.toString(),
  );

  const previousMonthSuccessData = monthStatusSuccess?.find(
    (balance) =>
      balance.month === monthNames[previousMonth] &&
      balance.year === previousYear.toString(),
  );

  const currentMonthSuccess = currentMonthSuccessData?.total_amount || 0;
  const previousMonthSuccess = previousMonthSuccessData?.total_amount || 0;

  const monthPercentageSuccessChange = calculatePercentageChange(
    currentMonthSuccess,
    previousMonthSuccess,
  );

  const currentYearSuccessData = yearStatusSuccess?.find(
    (balance) => balance.year === currentYear.toString(),
  );

  const previousYearSuccessData = yearStatusSuccess?.find(
    (balance) => balance.year === (currentYear - 1).toString(),
  );

  const currentYearSuccess = currentYearSuccessData?.total_amount || 0;
  const previousYearSucces = previousYearSuccessData?.total_amount || 0;

  const yearPercentageSuccessChange = calculatePercentageChange(
    currentYearSuccess,
    previousYearSucces,
  );

  const currentMonthFailedData = monthStatusFailed?.find(
    (balance) =>
      balance.month === monthNames[currentMonths] &&
      balance.year === currentYear.toString(),
  );

  const previousMonthFailedData = monthStatusFailed?.find(
    (balance) =>
      balance.month === monthNames[previousMonth] &&
      balance.year === previousYear.toString(),
  );

  const currentMonthFailed = currentMonthFailedData?.total_amount || 0;
  const previousMonthFailed = previousMonthFailedData?.total_amount || 0;

  const monthPercentageFailedChange = calculatePercentageChange(
    currentMonthFailed,
    previousMonthFailed,
  );

  const currentYearFailedData = yearStatusFailed?.find(
    (balance) => balance.year === currentYear.toString(),
  );

  const previousYearFailedData = yearStatusFailed?.find(
    (balance) => balance.year === (currentYear - 1).toString(),
  );

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
    if (!monthTopupMethod?.length) return [];

    const year = new Date().getFullYear();
    const methods = getUniqueMethods(monthTopupMethod, "topup_method");
    const dataByMethod = initializeDataByMethod(methods, 12);

    monthTopupMethod.forEach((item) => {
      const monthIndex = new Date(`${item.month} 1, ${year}`).getMonth();
      const methodIndex = methods.indexOf(item.topup_method);
      if (methodIndex !== -1 && item.total_amount) {
        dataByMethod[methodIndex].data[monthIndex] = item.total_amount;
      }
    });

    return dataByMethod;
  }, [monthTopupMethod]);

  const yearlyPaymentMethod = useMemo(() => {
    if (!yearTopupMethod?.length) return [];

    const methods = getUniqueMethods(yearTopupMethod, "topup_method");
    const dataByMethod = initializeDataByMethod(methods, 5);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    yearTopupMethod.forEach((item) => {
      const yearIndex = years.indexOf(Number(item.year));
      const methodIndex = methods.indexOf(item.topup_method);
      if (yearIndex !== -1 && methodIndex !== -1) {
        dataByMethod[methodIndex].data[yearIndex] = item.total_amount;
      }
    });

    return dataByMethod;
  }, [yearTopupMethod]);

  const monthlyAmount = useMemo(() => {
    if (!monthTopupAmount || !Array.isArray(monthTopupAmount)) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTopupAmount.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_amount !== undefined) {
        balances[monthIndex] = balance.total_amount;
      }
    });

    return balances;
  }, [monthTopupAmount]);

  const yearlyAmount = useMemo(() => {
    if (!yearTopupAmount || !Array.isArray(yearTopupAmount)) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearTopupAmount.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearTopupAmount]);

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
    async (year: number, card_number: string) => {
      try {
        setLoadingYearStatusSuccess(true);
        setErrorYearStatusSuccess(null);

        await findYearStatusSuccessByCardNumber(toast, year, card_number);
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
    async (year: number, month: number, card_number: string) => {
      try {
        setLoadingMonthStatusFailed(true);
        setErrorMonthStatusFailed(null);

        await findMonthStatusFailedByCardNumber(
          toast,
          year,
          month,
          card_number,
        );
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
    async (year: number, card_number: string) => {
      try {
        setLoadingYearStatusFailed(true);
        setErrorYearStatusFailed(null);

        await findYearStatusFailedByCardNumber(toast, year, card_number);
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

  const fetchMonthlyPaymentMethod = useCallback(
    async (year: number, card_number: string) => {
      try {
        setLoadingMonthTopupMethod(true);
        setErrorMonthTopupMethod(null);

        await findMonthTopupMethodCard(toast, year, card_number);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTopupMethod("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthTopupMethod(false);
      }
    },
    [
      findMonthTopupMethodCard,
      setLoadingMonthTopupMethod,
      setErrorMonthTopupMethod,
    ],
  );

  const fetchYearlyPaymentMethod = useCallback(
    async (year: number, card_number: string) => {
      try {
        setLoadingYearTopupMethod(true);
        setErrorYearTopupMethod(null);

        await findYearTopupMethodCard(toast, year, card_number);
      } catch (error) {
        setErrorYearTopupMethod("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTopupMethod(false);
      }
    },
    [
      findYearTopupMethodCard,
      setLoadingYearTopupMethod,
      setErrorYearTopupMethod,
    ],
  );

  const fetchMonthlyAmount = useCallback(
    async (year: number, card_number: string) => {
      try {
        setLoadingMonthTopupAmount(true);
        setErrorMonthTopupAmount(null);

        await findMonthTopupAmountCard(toast, year, card_number);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTopupAmount("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthTopupAmount(false);
      }
    },
    [
      findMonthTopupAmountCard,
      setLoadingMonthTopupAmount,
      setErrorMonthTopupAmount,
    ],
  );

  const fetchYearlyAmount = useCallback(
    async (year: number, card_number: string) => {
      try {
        setLoadingYearTopupAmount(true);
        setErrorYearTopupAmount(null);

        await findYearTopupAmountCard(toast, year, card_number);
      } catch (error) {
        setErrorYearTopupAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTopupAmount(false);
      }
    },
    [
      findYearTopupAmountCard,
      setLoadingYearTopupAmount,
      setErrorYearTopupAmount,
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

        debouncedFetchMonthlyPaymentMethod(selectedYear, card_number),
        debouncedFetchYearlyPaymentMethod(selectedYear, card_number),
        debouncedFetchMonthlyAmount(selectedYear, card_number),
        debouncedFetchYearlyAmount(selectedYear, card_number),
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {loadingMonthTopupMethod ? (
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
          {loadingYearTopupMethod ? (
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
          {loadingMonthTopupAmount ? (
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
          {loadingYearTopupAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Amount</CardTitle>
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

      <TableTopup
        search={search}
        setSearch={setSearch}
        isLoadingWithDelay={isLoadingWithDelay}
        loadingGetTopups={loadingGetCardNumberTopup}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
