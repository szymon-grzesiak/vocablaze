"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { LabelList, RadialBar, RadialBarChart } from "recharts";

interface ChartDataItem {
  nameOfMonth: string;
  wordCount: number;
  fill: string;
}

export function RadialChart({
  data,
}: {
  data: { nameOfMonth: string; wordCount: number }[];
}) {
  // Mapowanie danych i dodanie koloru wypełnienia
  const chartData: ChartDataItem[] = data.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${(index % 12) + 1}))`,
  }));

  const chartConfig: ChartConfig = {
    wordCount: {
      label: "Liczba słów",
    },
    ...chartData.reduce((acc, item, index) => {
      acc[item.nameOfMonth] = {
        label: item.nameOfMonth,
        color: `hsl(var(--chart-${(index % 12) + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  return (
    <Card className="flex h-full flex-col border-none bg-black/10 shadow-none dark:bg-slate-950">
      <CardHeader className="items-center pb-0">
        <CardDescription>Data from <span className="font-bold">{chartData[0].nameOfMonth}</span> to <span className="font-bold">{chartData[4].nameOfMonth}</span></CardDescription>
      </CardHeader>
      <CardContent className="grow p-0">
        <ChartContainer
          config={chartConfig}
          className="size-full grow"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius="20%"
            outerRadius="100%"
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel nameKey="nameOfMonth" />
              }
            />
            <RadialBar dataKey="wordCount" background>
              <LabelList
                position="insideStart"
                dataKey="nameOfMonth"
                className="fill-black capitalize mix-blend-luminosity dark:fill-white"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          This chart shows the number of words that were attempted to learn by you.
        </div>
      </CardFooter>
    </Card>
  );
}
