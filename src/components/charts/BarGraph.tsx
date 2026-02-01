import { Bar, BarChart, XAxis, YAxis } from "recharts";
// import Database from "../database";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../components/ui/chart";
import { type RootState } from "../../store/store";
import { useSelector } from "react-redux";

type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  timestamp: number;
};

type ChartRow = {
  category: string;
  Products: number;
  fill: string;
};

const ChartBarMixed = () => {
  const Database = useSelector((state: RootState) => state.product.list);

  const database: Product[] = Database; // ← your JSON

  const grouped = database.reduce<
    Record<string, { category: string; Products: number }>
  >((acc, item) => {
    const category = item.category;
    const stock = item.stock;

    if (!category || typeof stock !== "number") {
      return acc;
    }

    if (!acc[category]) {
      acc[category] = {
        category,
        Products: 0,
      };
    }

    acc[category].Products += stock;
    return acc;
  }, {});

  const chartData: ChartRow[] = Object.values(grouped)
    .sort((a, b) => b.Products - a.Products) // 🔥 sort DESC
    .map((item, i) => ({
      category: item.category,
      Products: item.Products,
      fill: `var(--chart-${i + 1})`,
    }));

  console.log("chartData : ", chartData);

  // const chartData = [
  //   { category: "chrome", Products: 275, fill: "var(--color-chrome)" },
  //   { category: "safari", Products: 200, fill: "var(--color-safari)" },
  //   { category: "firefox", Products: 187, fill: "var(--color-firefox)" },
  //   { category: "edge", Products: 173, fill: "var(--color-edge)" },
  //   { category: "other", Products: 90, fill: "var(--color-other)" },
  // ];

  const chartConfig = {
    Products: {
      label: "Products",
    },
    Electronics: {
      label: "Electronics",
      color: "var(--chart-1)",
    },
    Accessories: {
      label: "Accessories",
      color: "var(--chart-2)",
    },
    Furniture: {
      label: "Furniture",
      color: "var(--chart-3)",
    },
    Sports: {
      label: "Sports",
      color: "var(--chart-4)",
    },
    Appliances: {
      label: "Appliances",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;
  return (
    <Card className="bg-gray-900/50 text-white border-none w-full h-full md:w-125">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          Categories
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 15,
            }}>
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
              // data-testid={`${(value:any) =>
              //   chartConfig[value as keyof typeof chartConfig]?.label
              // }`}
            />
            <XAxis dataKey="Products" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Products" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="text-muted-foreground leading-none text-center">
          Showing total Products per category
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartBarMixed;
