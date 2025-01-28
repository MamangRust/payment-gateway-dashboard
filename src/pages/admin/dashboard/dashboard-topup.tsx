import { DollarSign, Repeat, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCallback, useEffect, useMemo, useState } from "react";
import useListTopup from "@/hooks/admin/topup/ListTopup";
import { TableTopup } from "@/components/admin/topup";
import useTopupStore from "../../../store/topup/topup";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/helpers/debounce";
import ThemeChart from "@/components/ui/chart";
import ChartSkeleton from "@/components/ui/chartSkeleton";
import { formatRupiah } from "@/helpers/formatRupiah";
import { YearPicker } from "@/components/ui/yearpicker";

export default function DashboardTopups() {
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

  const { toast } = useToast();

  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  const {
    table,
    search,
    setSearch,
    loadingGetTopups,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
    showModal,
  } = useListTopup();

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

    findMonthTopupMethod,
    monthTopupMethod,
    loadingMonthTopupMethod,
    errorMonthTopupMethod,
    setLoadingMonthTopupMethod,
    setErrorMonthTopupMethod,

    findYearTopupMethod,
    yearTopupMethod,
    loadingYearTopupMethod,
    setLoadingYearTopupMethod,
    setErrorYearTopupMethod,

    findMonthTopupAmount,
    monthTopupAmount,
    loadingMonthTopupAmount,
    errorMonthTopupAmount,
    setLoadingMonthTopupAmount,
    setErrorMonthTopupAmount,

    findYearTopupAmount,
    yearTopupAmount,
    loadingYearTopupAmount,
    setLoadingYearTopupAmount,
    setErrorYearTopupAmount,
  } = useTopupStore();

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

  const fetchMonthlyPaymentMethod = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTopupMethod(true);
        setErrorMonthTopupMethod(null);

        await findMonthTopupMethod(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTopupMethod("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthTopupMethod(false);
      }
    },
    [
      findMonthTopupMethod,
      setLoadingMonthTopupMethod,
      setErrorMonthTopupMethod,
    ],
  );

  const fetchYearlyPaymentMethod = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTopupMethod(true);
        setErrorYearTopupMethod(null);

        await findYearTopupMethod(toast, year);
      } catch (error) {
        setErrorYearTopupMethod("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTopupMethod(false);
      }
    },
    [findYearTopupMethod, setLoadingYearTopupMethod, setErrorYearTopupMethod],
  );

  const fetchMonthlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTopupAmount(true);
        setErrorMonthTopupAmount(null);

        await findMonthTopupAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTopupAmount("Failed to fetch monthly payment method");
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

  const fetchYearlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTopupAmount(true);
        setErrorYearTopupAmount(null);

        await findYearTopupAmount(toast, year);
      } catch (error) {
        setErrorYearTopupAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTopupAmount(false);
      }
    },
    [findYearTopupAmount, setLoadingYearTopupAmount, setErrorYearTopupAmount],
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
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Topups</CardTitle>
            <DollarSign className="h-6 w-6 text-gray-500" />{" "}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>{" "}
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Topups Success
            </CardTitle>
            <Repeat className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">105</div>{" "}
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Topups Pending
            </CardTitle>
            <FileText className="h-6 w-6 text-gray-500" />{" "}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>{" "}
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topups Failed</CardTitle>
            <FileText className="h-6 w-6 text-gray-500" />{" "}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>{" "}
          </CardContent>
        </Card>
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
        loadingGetTopups={loadingGetTopups}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
