import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import { type RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const description = "A simple area chart";

const LineGraph = () => {
  const data = useSelector((state: RootState) => state.product.list);

  /* ------------------------------------------------------------------ */
  /* 1️⃣ Sort data chronologically */
  /* ------------------------------------------------------------------ */
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);

  /* ------------------------------------------------------------------ */
  /* 2️⃣ Group stock by month */
  /* ------------------------------------------------------------------ */
  const monthlyStockMap = new Map<string, number>();

  sortedData.forEach((item) => {
    const d = new Date(item.timestamp);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthlyStockMap.set(key, (monthlyStockMap.get(key) ?? 0) + item.stock);
  });

  /* ------------------------------------------------------------------ */
  /* 3️⃣ Build FULL cumulative stock history */
  /* ------------------------------------------------------------------ */
  let cumulativeStock = 0;

  const stockData = Array.from(monthlyStockMap.entries())
    .map(([key, stock]) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, stock };
    })
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
    .map(({ year, month, stock }) => {
      cumulativeStock += stock;
      return {
        year,
        month,
        totalStock: cumulativeStock,
      };
    });

  /* Fast lookup */
  const stockDataMap = new Map(
    stockData.map((s) => [`${s.year}-${s.month}`, s.totalStock]),
  );

  /* ------------------------------------------------------------------ */
  /* 4️⃣ Generate last 6 months based on latest entry */
  /* ------------------------------------------------------------------ */
  const lastEntry = stockData.at(-1)!;

  const last6Months: { year: number; month: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(lastEntry.year, lastEntry.month - i);
    last6Months.push({
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5️⃣ Seed stock BEFORE window (critical fix) */
  /* ------------------------------------------------------------------ */
  const firstMonth = last6Months[0];
  let lastKnownStock = 0;

  for (let i = stockData.length - 1; i >= 0; i--) {
    const s = stockData[i];
    if (
      s.year < firstMonth.year ||
      (s.year === firstMonth.year && s.month < firstMonth.month)
    ) {
      lastKnownStock = s.totalStock;
      break;
    }
  }

  /* ------------------------------------------------------------------ */
  /* 6️⃣ Final chart data (carry-forward logic) */
  /* ------------------------------------------------------------------ */
  const chartData = last6Months.map(({ year, month }) => {
    const key = `${year}-${month}`;
    const stockForMonth = stockDataMap.get(key);

    if (stockForMonth !== undefined) {
      lastKnownStock = stockForMonth;
    }

    return {
      month: new Date(year, month).toLocaleString("default", {
        month: "long",
      }),
      stocks: lastKnownStock,
    };
  });

  /* ------------------------------------------------------------------ */

  const chartConfig = {
    stocks: {
      label: "Stocks",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full h-full md:w-125 bg-gray-900/50 text-white border-none">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Stocks</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="stocks"
              type="natural"
              fill="var(--color-stocks)"
              fillOpacity={0.4}
              stroke="var(--color-stocks)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <CardDescription>
          Showing total stocks for the last 6 months
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default LineGraph;
