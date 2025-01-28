import { Repeat, FileText, ChevronDown } from "lucide-react";
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

export default function DashboardTransactions() {
  const { toast } = useToast();
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

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

  const getUniqueMethods = (data, key) => {
    return Array.from(new Set(data.map((item) => item[key])));
  };

  const initializeDataByMethod = (methods, length) => {
    return methods.map((method) => ({
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

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
  };

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
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchMonthlyPaymentMethod.cancel();
      debouncedFetchYearlyPaymentMethod.cancel();
      debouncedFetchMonthlyAmount.cancel();
      debouncedFetchYearlyAmount.cancel();
    };
  }, [selectedYear]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <FileText className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200</div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions Success
            </CardTitle>
            <Repeat className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">130</div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions Pending
            </CardTitle>
            <FileText className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions Failed
            </CardTitle>
            <FileText className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>{" "}
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-8 mt-4">
        <div className="flex justify-between">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {/* {format(selectedMonth, "MMMM", { locale: id })}{" "} */}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  // selected={selectedMonth}
                  // onSelect={(date) => {
                  //   if (date) {
                  //     setSelectedMonth(date);
                  //     fetchMonthlyData(date);
                  //   }
                  // }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            {/* <YearPicker
              selectedYear={selectedYear}
              onYearChange={(date) => handleYearChange(date)}
            /> */}
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
