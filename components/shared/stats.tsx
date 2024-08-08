"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Zestaw 1",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Zestaw 2",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Zestaw 3",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Zestaw 4",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Zestaw 5",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
export function RadialChart({
  wordSets,
  error,
}: {
  wordSets:
    | {
        id: string;
        title: string;
        description: string | null;
        firstLanguageId: string;
        secondLanguageId: string;
        isShared: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        userId: string;
        folderId: string | null;
      }[]
    | undefined;
  error?: string;
}) {
  const fiveMostRecentWordSets = wordSets?.slice(0, 5);
  return (
    <Card className="flex flex-col bg-transparent border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-start pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[215px] w-full max-w-[215px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
