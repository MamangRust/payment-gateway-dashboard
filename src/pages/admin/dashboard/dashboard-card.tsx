import { useEffect, useState } from "react";
import { ChevronDown, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ThemeChart from "@/components/ui/chart";
import TableCard from "@/components/admin/card/table/table-card";
import useListCard from "@/hooks/admin/card/ListCard";

export default function DashboardCard() {
  const {
    table,
    search,
    setSearch,
    loadingGetCards,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
    showModal,
  } = useListCard();

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<Date>(new Date());
  const [monthlyBalances, setMonthlyBalances] = useState<number[]>([]);
  const [yearlyBalances, setYearlyBalances] = useState<number[]>([]);

  const generateMonthlyData = (monthDate: Date) => {
    const month = monthDate.getMonth() + 1;

    const dummyMonthly = Array.from({ length: 12 }, (_, i) =>
      Math.floor(Math.random() * 1000),
    );
    setMonthlyBalances(dummyMonthly);
  };

  const generateYearlyData = (yearDate: Date) => {
    const year = yearDate.getFullYear();

    const dummyYearly = Array.from({ length: 5 }, (_, i) =>
      Math.floor(Math.random() * 5000),
    );
    setYearlyBalances(dummyYearly);
  };

  useEffect(() => {
    generateMonthlyData(selectedMonth);
    generateYearlyData(selectedYear);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-10">
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Merchants
            </CardTitle>
            <Store className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Merchants
            </CardTitle>
            <Store className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Suspended Merchants
            </CardTitle>
            <Store className="h-6 w-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col min-h-0 space-y-8 mt-4">
        <div className="flex justify-between">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {format(selectedMonth, "MMMM", { locale: id })}{" "}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedMonth}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedMonth(date);
                      generateMonthlyData(date);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {format(selectedYear, "yyyy")}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedYear}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedYear(date);
                      generateYearlyData(date);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  yaxis: { title: { text: "Balance ($)" } },
                  colors: ["#6366F1"],
                }}
                series={[{ name: "Monthly Balance", data: monthlyBalances }]}
                type="line"
                height={300}
              />
            </CardContent>
          </Card>

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
                  yaxis: { title: { text: "Balance ($)" } },
                  colors: ["#22C55E"],
                }}
                series={[{ name: "Yearly Balance", data: yearlyBalances }]}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
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
