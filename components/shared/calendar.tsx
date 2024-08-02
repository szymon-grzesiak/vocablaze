"use client";

import { CalendarDatum, ResponsiveCalendar } from "@nivo/calendar";

export const MyResponsiveCalendar = ({ data }: { data: CalendarDatum[] }) => (
  <ResponsiveCalendar
    data={data}
    from="2024-01-01"
    to="2024-12-31"
    emptyColor="transparent"
    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    yearSpacing={40}
    monthBorderColor="#ffffff"
    dayBorderWidth={1}
    dayBorderColor="#ffffff"
    legends={[
      {
        anchor: "top-right",
        direction: "row",
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 36,
        itemsSpacing: 14,
        itemDirection: "right-to-left",
      },
    ]}
  />
);
