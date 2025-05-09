import { useEffect, useMemo, useState } from "react";
import { TableTopup } from "@/components/admin/topup";
import { useToast } from "@/hooks/use-toast";
import { YearPicker } from "@/components/ui/yearpicker";
import { MonthPicker, months } from "@/components/ui/monthpicker";
import { useParams } from "react-router-dom";
import useListTopupCardNumber from "@/hooks/admin/topup/ListTopupCardNumber";
import { useMonthAmountTopupDetail, useMonthPaymentMethodTopupDetail, useMonthStatusFailedTopupDetail, useMonthStatusSuccessTopupDetail, useYearAmountTopupDetail, useYearPaymentMethodTopupDetail, useYearStatusFailedTopupDetail, useYearStatusSuccessTopupDetail } from "@/hooks/admin/card/dashboard/topup";
import TotalCardTopupDetail from "@/components/admin/topup/dasboard/detail/total";
import ChartDashboarTopupDetail from "@/components/admin/topup/dasboard/detail/chart";

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
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonths = currentDate.getMonth();

  const previousMonth = currentMonths === 0 ? 11 : currentMonths - 1;
  const previousYear = currentMonths === 0 ? currentYear - 1 : currentYear;

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
    monthPercentageSuccessChange,
    loadingMonthStatusSuccess,
    currentMonthSuccess,
    previousMonthSuccess,
    debouncedFetchMonthlySuccess
  } = useMonthStatusSuccessTopupDetail(currentMonths, currentYear, previousMonth, previousYear, toast);

  const {
    debouncedFetchYearlySuccess,
    loadingYearStatusSuccess,
    previousYearSuccessData,
    currentYearSuccess,
    yearPercentageSuccessChange,
  } = useYearStatusSuccessTopupDetail(currentYear, toast);

  const {
    monthPercentageFailedChange,
    loadingMonthStatusFailed,
    currentMonthFailed,
    previousMonthFailed,
    debouncedFetchMonthlyFailed
  } = useMonthStatusFailedTopupDetail(currentMonths, currentYear, previousMonth, previousYear, toast);

  const {
    debouncedFetchYearlyFailed,
    loadingYearStatusFailed,
    previousYearFailedData,
    currentYearFailed,
    yearPercentageFailedChange,
  } = useYearStatusFailedTopupDetail(currentYear, toast);

  const {
    loadingMonthTopupAmount,
    monthlyAmount,
    debouncedFetchMonthlyAmount
  } = useMonthAmountTopupDetail(toast);

  const {
    loadingYearTopupAmount,
    yearlyAmount,
    debouncedFetchYearlyAmount
  } = useYearAmountTopupDetail(toast);

  const {
    loadingMonthTopupMethod,
    monthlyPaymentMethod,
    debouncedFetchMonthlyPaymentMethod
  } = useMonthPaymentMethodTopupDetail(toast);

  const {
    loadingYearTopupMethod,
    yearlyPaymentMethod,
    debouncedFetchYearlyPaymentMethod
  } = useYearPaymentMethodTopupDetail(toast);

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);
  };

  const handleMonthChange = (month: { name: string; number: number }) => {
    setSelectedMonth(month);
  };



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
        <TotalCardTopupDetail
          loadingMonthStatusSuccess={loadingMonthStatusSuccess}
          currentMonthSuccess={currentMonthSuccess}
          previousMonthSuccess={previousMonthSuccess}
          monthPercentageSuccessChange={monthPercentageSuccessChange}
          loadingYearStatusSuccess={loadingYearStatusSuccess}
          currentYearSuccess={currentYearSuccess}
          previousYearSuccessData={previousYearSuccessData!}
          yearPercentageSuccessChange={yearPercentageSuccessChange}
          loadingMonthStatusFailed={loadingMonthStatusFailed}
          currentMonthFailed={currentMonthFailed}
          previousMonthFailed={previousMonthFailed}
          monthPercentageFailedChange={monthPercentageFailedChange}
          loadingYearStatusFailed={loadingYearStatusFailed}
          currentYearFailed={currentYearFailed}
          previousYearFailedData={previousYearFailedData!}
          yearPercentageFailedChange={yearPercentageFailedChange}
        />
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
          <ChartDashboarTopupDetail
            loadingMonthTopupAmount={loadingMonthTopupAmount}
            loadingMonthTopupMethod={loadingMonthTopupMethod}
            loadingYearTopupAmount={loadingYearTopupAmount}
            loadingYearTopupMethod={loadingYearTopupMethod}
            monthlyAmount={monthlyAmount}
            monthlyPaymentMethod={monthlyPaymentMethod}
            yearlyAmount={yearlyAmount}
            yearlyPaymentMethod={yearlyPaymentMethod}
          />
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
