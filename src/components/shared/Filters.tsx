"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: { name: string; value: string }[];
  containerClasses?: string;
}

const Filter = ({ filters }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("sort") || "";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Select
        onValueChange={handleValueChange}
        defaultValue={paramFilter}
      >
        <SelectTrigger
          className="border px-5 py-2.5">
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="border-none">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
