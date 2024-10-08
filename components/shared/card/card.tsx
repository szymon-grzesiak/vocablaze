"use client";

import { AddWordSetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Flag, Folder, Plus, TrashIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { addWordSet, updateWordSet } from "@/lib/actions/action";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, Delete02Icon } from "@/components/icons";
import { ImportWords } from "@/components/shared/import-words";

import "./background.css";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  buttonText?: string;
  languages: { id: string; name: string }[];
  folders: { id: string; name: string; color: string | null; userId: string }[];
  wordSet?: any;
  mode: "add" | "edit";
}

type Schema = z.infer<typeof AddWordSetSchema>;

export const CardComponent = ({
  text,
  languages,
  mode,
  wordSet,
  folders,
}: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openFirstLang, setOpenFirstLang] = useState(false);
  const [openSecLang, setOpenSecLang] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof AddWordSetSchema>>({
    resolver: zodResolver(AddWordSetSchema),
    defaultValues: {
      title: wordSet?.title ?? "",
      description: wordSet?.description ?? "",
      firstLanguageId: wordSet?.firstLanguageId ?? "",
      secondLanguageId: wordSet?.secondLanguageId ?? "",
      folders: wordSet?.folders.map((folder: any) => folder.id) ?? [],
      words:
        wordSet?.words
          ?.map((word: any) => ({ ...word }))
          .sort((a: any, b: any) => b.order - a.order) ?? [],
    } as {
      title: string;
      description: string;
      firstLanguageId: string;
      secondLanguageId: string;
      folders: string[];
      words: { originalWord: string; translatedWord: string }[];
    } & {},
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  console.log("WATCHER", form.watch())

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "words",
  });
  console.log("fields", fields);

  const onSubmit = async (input: Schema) => {
    console.log("input", input);
    const uniqueWords = new Set<string>();
    const words = input.words.filter(({ originalWord, translatedWord }) => {
      const key = `${originalWord}-${translatedWord}`;
      if (uniqueWords.has(key)) return false;
      uniqueWords.add(key);
      return true;
    });

    setIsLoading(true);
    try {
      if (mode === "edit") {
        await updateWordSet(wordSet?.id as string, { ...input, words });
        toast.success("Word set updated successfully");
        router.push("/home");
      } else {
        await addWordSet({ ...input, words });
        toast.success("Word set added successfully");
        router.push("/home");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card
      radius="lg"
      className="border-none flex flex-col gap-6 w-full md:w-[70%] bg-black/5 dark:bg-slate-900/90 backdrop-blur-2xl shadow-md mb-20 p-6"
    >
      <div className="flex gap-4 justify-start items-center">
        <Bookmark className="w-10 h-10 text-black fill-white/60" />
        <h1 className="text-[36px] font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)]">
          {text}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    variant="bordered"
                    label="Title"
                    size="lg"
                    className="bg-white/60 dark:bg-slate-800 dark:bg-none rounded-md text-3xl text-black dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your description"
                    className="bg-white/60 dark:bg-slate-800 rounded-md h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 flex-wrap">
            <FormField
              name="firstLanguageId"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover
                      open={openFirstLang}
                      onOpenChange={setOpenFirstLang}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="shadow"
                          role="combobox"
                          startContent={<Flag />}
                          className={cn(
                            "w-[250px] justify-between bg-white/50 dark:bg-slate-800",
                            !field.value &&
                              "text-muted-foreground dark:text-white"
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
                                    setOpenFirstLang(false);
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="secondLanguageId"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={openSecLang} onOpenChange={setOpenSecLang}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="shadow"
                          role="combobox"
                          startContent={<Flag className="shrink-0" />}
                          className={cn(
                            "w-[270px] justify-between bg-white/50 dark:bg-slate-800",
                            !field.value &&
                              "text-muted-foreground dark:text-white"
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
                                    setOpenSecLang(false);
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="folders"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      selectionMode="multiple"
                      placeholder="Select folders"
                      className="w-[270px]"
                      startContent={<Folder />}
                      selectedKeys={
                        Array.isArray(field.value)
                          ? field.value
                          : Array.from(field.value || [])
                      } // Konwersja Set na tablicę
                      onSelectionChange={(selected) =>
                        field.onChange(Array.from(selected))
                      } // Konwersja Set na tablicę przy zmianie
                    >
                      {folders?.map((folder) => (
                        <SelectItem key={folder.id} value={field.value}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h4>Word List</h4>
              <p className="text-[0.8rem] text-muted-foreground">
                Add your words in different languages &#40;min.{" "}
                <strong>5</strong> words&#41;
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
                        <FormField
                          control={control}
                          name={`words.${index}.originalWord`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  variant="underlined"
                                  placeholder="First Language"
                                  className="h-8 text-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`words.${index}.translatedWord`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  variant="underlined"
                                  placeholder="Second Language"
                                  className="h-8 text-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <SortableDragHandle
                        type="button"
                        className="cursor-move bg-white/20 hover:bg-black/10"
                      >
                        <DragHandleDots2Icon className="text-black dark:text-white" />
                      </SortableDragHandle>
                      <Button
                        type="button"
                        isIconOnly
                        className="size-2 shrink-0 text-black  hover:text-white hover:bg-white/20"
                        onClick={() => remove(index)}
                        color="secondary"
                        variant="flat"
                      >
                        <Delete02Icon />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </Sortable>
          </div>
          {errors.words && (
            <div className="text-red-500 text-sm">{errors.words.message}</div>
          )}
          <div className="flex justify-between pt-4">
            <Button type="submit" className="w-fit" disabled={isLoading}>
              {isLoading ? <Spinner /> : mode === "edit" ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="flat"
              color="success"
              size="sm"
              className="w-fit text-black text-sm font-bold"
              startContent={<Plus className="text-emerald-400" />}
              onClick={() => append({ originalWord: "", translatedWord: "" })}
            >
              Add word
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
