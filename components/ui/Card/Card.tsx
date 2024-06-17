"use client";

import { AddWordSetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardFooter, Input } from "@nextui-org/react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Plus, PlusCircle, TrashIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { addWordSet } from "@/lib/actions/action";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Bookmark } from "@/components/icons";
import { ImportWords } from "@/app/(protected)/_components/import-words";

import { Textarea } from "../textarea";

import "./Background.css";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  languages: { id: string; name: string }[];
  folders: { id: string; name: string }[];
  text?: string;
  buttonText?: string;
}

type Schema = z.infer<typeof AddWordSetSchema>;

export const CardComponent = ({
  buttonText = "Click",
  text = "Welcome to San Diego",
  languages,
  folders,
  children,
  className,
}: CardProps) => {
  const { control, handleSubmit, register } = useForm<Schema>({
    resolver: zodResolver(AddWordSetSchema),
    defaultValues: {
      words: [
        {
          original_word: "Hello",
          translated_word: "Hola",
        },
      ],
      title: "",
      description: "",
      firstLanguageId: "",
      secondLanguageId: "",
      folderId: "",
    },
  });

  const { fields, append, prepend, remove, move } = useFieldArray({
    control,
    name: "words",
  });

  const onSubmit = async (input: Schema) => {
    const uniqueWords = new Set<string>();
    const words = input.words.filter(({ original_word, translated_word }) => {
      const key = `${original_word}-${translated_word}`;
      if (uniqueWords.has(key)) return false;
      uniqueWords.add(key);
      return true;
    });

    console.log({
      ...input,
      words,
    });

    const response = await addWordSet({
      ...input,
      words,
    });

    if (response.error) {
      console.error(response.error);
      // Show error message to the user
    } else {
      console.log(response.success);
      window.location.href = "/home"; // Using window.location.href for redirection
    }
  };

  return (
    <Card
      radius="lg"
      className="border-none flex flex-col gap-6 w-full md:w-[70%] banner-custom mb-20 p-6"
    >
      <div className="flex gap-4 justify-start items-center">
        <Bookmark className="w-10 h-10 text-black fill-white/60" />
        <h1 className="text-[36px] font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)]">
          {text}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="text"
          variant="bordered"
          label="Title"
          size="lg"
          className="bg-white/60 rounded-md text-3xl text-black dark:text-white"
          {...register("title")}
        />
        <Textarea
          placeholder="Enter your description"
          className="bg-white/60 rounded-md h-[150px]"
          {...register("description")}
        />
        <div className="flex gap-4">
          <Controller
            name="firstLanguageId"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="shadow"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between bg-white/50",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? languages.find(
                          (language) => language.id === field.value
                        )?.name
                      : "Select First Language"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.id}
                            key={language.id}
                            onSelect={() => {
                              field.onChange(language.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
          <Controller
            name="secondLanguageId"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="shadow"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between bg-white/50",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? languages.find(
                          (language) => language.id === field.value
                        )?.name
                      : "Select Second Language"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.id}
                            key={language.id}
                            onSelect={() => {
                              field.onChange(language.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
            <Controller
            name="folderId"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="shadow"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between bg-white/50",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? folders.find(
                          (folder) => folder.id === field.value
                        )?.name
                      : "Select folder"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search folder..." />
                    <CommandEmpty>No folder found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {folders.map((folder) => (
                          <CommandItem
                            value={folder.id}
                            key={folder.id}
                            onSelect={() => {
                              field.onChange(folder.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                folder.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {folder.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h4>Word List</h4>
            <p className="text-[0.8rem] text-muted-foreground">
              Add your words in different languages
            </p>
          </div>
          <ImportWords append={append} existingWords={fields} />
        </div>
        <div className="flex justify-between space-y-2 mt-4">
          <Sortable
            value={fields}
            onMove={({ activeIndex, overIndex }) =>
              move(activeIndex, overIndex)
            }
          >
            <div className="w-full space-y-2">
              {fields.map((field, index) => (
                <SortableItem key={field.id} value={field.id} asChild>
                  <div className="w-full flex gap-4 items-center">
                    <div className="w-full flex gap-20 divItem">
                      <Input
                        className="h-8 text-blue-500"
                        {...register(`words.${index}.original_word` as const)}
                        placeholder="First Language"
                        variant="underlined"
                      />
                      <Input
                        className="h-8"
                        {...register(`words.${index}.translated_word` as const)}
                        placeholder="Second Language"
                        variant="underlined"
                      />
                    </div>
                    <SortableDragHandle className="cursor-move">
                      <DragHandleDots2Icon />
                    </SortableDragHandle>
                    <Button
                      type="button"
                      variant="shadow"
                      isIconOnly
                      color="danger"
                      className="size-2 shrink-0"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="size-4" aria-hidden="true" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </SortableItem>
              ))}
            </div>
          </Sortable>
        </div>
        <div className="flex justify-between pt-4">
          <button type="submit" className="w-fit">
            Submit
          </button>
          <Button
            type="button"
            variant="flat"
            color="success"
            size="sm"
            className="w-fit text-black text-md"
            startContent={<Plus className="text-emerald-400" />}
            onClick={() => append({ original_word: "", translated_word: "" })}
          >
            Add a new word
          </Button>
        </div>
      </form>
    </Card>
  );
};
