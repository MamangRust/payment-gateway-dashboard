import { debounce } from "@/helpers/debounce";
import useTopupStore from "@/store/topup/topup";
import { useCallback, useMemo } from "react";

export default function useYearAmountTopupDetail(toast: any) {
    const {
        findYearTopupAmountCard,
        yearTopupAmount,
        loadingYearTopupAmount,
        setLoadingYearTopupAmount,
        setErrorYearTopupAmount,
    } = useTopupStore();

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
        [findYearTopupAmountCard, setLoadingYearTopupAmount, setErrorYearTopupAmount],
    );

    const debouncedFetchYearlyAmount = debounce(fetchYearlyAmount, 300);

    return{
        findYearTopupAmountCard,
        yearTopupAmount,
        loadingYearTopupAmount,
        setLoadingYearTopupAmount,
        setErrorYearTopupAmount,
        yearlyAmount,
        fetchYearlyAmount,
        debouncedFetchYearlyAmount
    }
}