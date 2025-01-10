import { ChevronDown, CreditCard, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "react-apexcharts";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TableCard from "@/components/admin/card/table/table-card";
import useListCard from "@/hooks/admin/card/ListCard";
import { ApexOptions } from "apexcharts";

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

  const barChartOptions: ApexOptions = {
    chart: {
      id: "card-type-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Visa", "MasterCard", "Amex"],
    },
    yaxis: {
      title: {
        text: "Number of Cards",
      },
    },
    colors: ["#6366F1", "#22C55E", "#EAB308"],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "45%",
      },
    },
  };

  const doughnutChartOptions: ApexOptions = {
    chart: {
      id: "card-status-chart",
    },
    labels: ["Active", "Pending", "Expired"],
    colors: ["#22C55E", "#EAB308", "#EF4444"],
    legend: { position: "bottom" },
    yaxis: {
      show: false,
    },
  };

  const barChartSeries = [
    {
      name: "Cards",
      data: [80, 50, 20],
    },
  ];

  const doughnutChartSeries = [120, 20, 10];

  return (
    <div className="flex h-full overflow-hidden">
      <main className="flex-1 p-8 overflow-auto pb-24">
        {" "}
        <div className="flex-1 flex flex-col min-h-0 space-y-8">
          {" "}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {" "}
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                {" "}
                <CardTitle className="text-sm font-medium">
                  Total Cards
                </CardTitle>
                <CreditCard className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150</div>
              </CardContent>
            </Card>
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                {" "}
                <CardTitle className="text-sm font-medium">
                  Active Cards
                </CardTitle>
                <ShieldCheck className="h-6 w-6 text-gray-500" />{" "}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Card Types Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  options={barChartOptions}
                  series={barChartSeries}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Card Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  options={doughnutChartOptions}
                  series={doughnutChartSeries}
                  type="donut"
                  height={300}
                />
              </CardContent>
            </Card>
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
      </main>
    </div>
  );
}
