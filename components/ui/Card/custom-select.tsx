"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";

interface Option {
  id: string;
  name: string;
}

interface CustomSelectProps {
  control: Control<any>;
  name: string;
  options: Option[];
  placeholder?: string;
  label?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ control, name, options = [], placeholder = "Select...", label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          {label && <label className="text-sm font-medium">{label}</label>}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="shadow"
                role="combobox"
                className={cn(
                  "w-[200px] justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? options.find(
                      (option) => option.id === field.value
                    )?.name
                  : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.id}
                      key={option.id}
                      onSelect={() => {
                        field.onChange(option.id);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.id === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};

export default CustomSelect;
