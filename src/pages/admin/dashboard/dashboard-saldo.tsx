import { Wallet, TrendingDown } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TableSaldo } from "@/components/admin/saldo";
import useListSaldo from "@/hooks/admin/saldo/ListSaldo";
import useSaldoStore from "@/store/saldo/saldo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { YearPicker } from "@/components/ui/yearpicker";
import { months, MonthPicker } from "@/components/ui/monthpicker";
import { formatRupiah } from "@/helpers/formatRupiah";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import ThemeChart from "@/components/ui/chart";
import { debounce } from "@/helpers/debounce";

export default function DashboardSaldo() {
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
    loadingGetSaldos,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
  } = useListSaldo();

  const {
    monthBalance,
    loadingMonthBalance,
    errorMonthBalance,
    findMonthBalance,
    setLoadingMonthBalance,
    setErrorMonthBalance,

    yearBalance,
    loadingYearBalance,
    errorYearBalance,
    findYearBalance,
    setLoadingYearBalance,
    setErrorYearBalance,

    monthTotalBalance,
    loadingMonthTotalBalance,
    errorMonthTotalBalance,
    findMonthTotalBalance,
    setLoadingMonthTotalBalance,
    setErrorMonthTotalBalance,

    yearTotalBalance,
    loadingYearTotalBalance,
    errorYearTotalBalance,
    findYearTotalBalance,
    setLoadingYearTotalBalance,
    setErrorYearTotalBalance,
  } = useSaldoStore();

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

  const calculatePercentageChange = (
    current: number,
    previous: number,
  ): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const currentMonthData =
    monthTotalBalance && Array.isArray(monthTotalBalance)
      ? monthTotalBalance.find(
          (balance) =>
            parseInt(balance.month) === currentMonths + 1 &&
            parseInt(balance.year) === currentYear,
        )
      : null;

  const previousMonthData =
    monthTotalBalance && Array.isArray(monthTotalBalance)
      ? monthTotalBalance.find(
          (balance) =>
            parseInt(balance.month) === previousMonth + 1 &&
            parseInt(balance.year) === previousYear,
        )
      : null;

  const currentMonthBalance = currentMonthData?.total_balance || 0;
  const previousMonthBalance = previousMonthData?.total_balance || 0;

  const monthPercentageChange = calculatePercentageChange(
    currentMonthBalance,
    previousMonthBalance,
  );

  const currentYearData =
    yearTotalBalance && Array.isArray(yearTotalBalance)
      ? yearTotalBalance.find(
          (balance) => balance.year === currentYear.toString(),
        )
      : null;

  const previousYearData =
    yearTotalBalance && Array.isArray(yearTotalBalance)
      ? yearTotalBalance.find(
          (balance) => balance.year === (currentYear - 1).toString(),
        )
      : null;

  const currentYearBalance = currentYearData?.total_balance || 0;
  const previousYearBalance = previousYearData?.total_balance || 0;

  const yearPercentageChange = calculatePercentageChange(
    currentYearBalance,
    previousYearBalance,
  );

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

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearBalance]);

  const fetchMonthlyTotalbalance = useCallback(
    async (year: number, month: number) => {
      try {
        setLoadingMonthTotalBalance(true);
        setErrorMonthTotalBalance(null);

        await findMonthTotalBalance(toast, year, month);
      } catch (error) {
        setErrorMonthTotalBalance("Failed to fetch monthly balance");
      } finally {
        setLoadingMonthTotalBalance(false);
      }
    },
    [findMonthBalance, setLoadingMonthBalance, setErrorMonthBalance],
  );

  const fetchYearlyTotalBalance = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTotalBalance(true);
        setErrorYearTotalBalance(null);

        await findYearTotalBalance(toast, year);
      } catch (error) {
        setErrorYearTotalBalance("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTotalBalance(false);
      }
    },
    [findYearBalance, setLoadingYearBalance, setErrorYearBalance],
  );

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

  const debouncedFetchMonthlyData = debounce(fetchMonthlyData, 300);
  const debouncedFetchYearlyData = debounce(fetchYearlyData, 300);
  const debouncedFetchMonthlyTotalBalance = debounce(
    fetchMonthlyTotalbalance,
    300,
  );
  const debouncedFetchYearlyTotalBalance = debounce(
    fetchYearlyTotalBalance,
    300,
  );

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        debouncedFetchMonthlyData(selectedYear),
        debouncedFetchYearlyData(selectedYear),
        debouncedFetchMonthlyTotalBalance(selectedYear, selectedMonth.number),
        debouncedFetchYearlyTotalBalance(selectedYear),
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchMonthlyData.cancel();
      debouncedFetchYearlyData.cancel();
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
              Total Balance Month
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
              Total Balance Year
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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
        </div>
      </div>

      <TableSaldo
        search={search}
        setSearch={setSearch}
        isLoadingWithDelay={isLoadingWithDelay}
        loadingGetSaldos={loadingGetSaldos}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
