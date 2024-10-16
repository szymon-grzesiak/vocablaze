"use client";

import { useTheme } from "@/context/ThemeProvider";
import { Calendar, CalendarDatum, ResponsiveCalendar } from "@nivo/calendar";

export const MyCalendar = ({ data }: { data: CalendarDatum[] }) => {
  const theme = useTheme();
  return (
    <Calendar
      data={data}
      from="2024-01-01"
      to="2024-12-31"
      emptyColor="transparent"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      yearSpacing={40}
      width={700}
      height={350}
      monthBorderColor="#94a3b8"
      dayBorderWidth={1}
      theme={{
        text: {
          fontSize: 11,
          fill: `${theme.mode === "dark" ? "#ffffff" : "#000000"}`,
          outlineWidth: 0,
          outlineColor: "transparent",
        },
        tooltip: {
          container: {
            fontSize: 11,
            color: "#000000",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
        },
      }}
      dayBorderColor="#94a3b8"
      legends={[
        {
          anchor: "top-right",
          direction: "row",
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 20,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};

export const MyResponsiveCalendar = ({ data }: { data: CalendarDatum[] }) => {
  const theme = useTheme();
  return (
    <ResponsiveCalendar
      data={data}
      from="2024-01-01"
      to="2024-12-31"
      emptyColor="transparent"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      yearSpacing={40}
      monthBorderColor="#94a3b8"
      dayBorderWidth={1}
      theme={{
        text: {
          fontSize: 11,
          fill: `${theme.mode === "dark" ? "#ffffff" : "#000000"}`,
          outlineWidth: 0,
          outlineColor: "transparent",
        },
        tooltip: {
          container: {
            fontSize: 11,
            color: "#000000",
            outlineWidth: 0,
            outlineColor: "transparent",
          },
        },
      }}
      dayBorderColor="#94a3b8"
      legends={[
        {
          anchor: "top-right",
          direction: "row",
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 20,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};
