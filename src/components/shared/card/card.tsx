"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
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
import { Check, ChevronsUpDown, Flag, Folder, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { addWordSet, updateWordSet } from "@/lib/actions/action";
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
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, Delete02Icon } from "@/components/icons";
import { ImportWords } from "@/components/shared/ImportWords";

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

export default function CardComponent({
  text,
  languages,
  mode,
  wordSet,
  folders,
}: CardProps) {
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

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "words",
  });

  const onSubmit = async (input: Schema) => {
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
      className="mb-20 flex w-full flex-col gap-6 border-none bg-black/5 p-6 shadow-md backdrop-blur-2xl dark:bg-slate-900/90 md:w-[70%]"
    >
      <div className="flex items-center justify-start gap-4">
        <Bookmark className="size-10 fill-white/60 text-black" />
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
                    data-cy="title"
                    variant="bordered"
                    label="Title"
                    size="lg"
                    className="rounded-md bg-white/60 text-3xl text-black dark:bg-slate-800 dark:bg-none dark:text-white"
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
                    data-cy="description"
                    placeholder="Enter your description"
                    className="h-[150px] rounded-md bg-white/60 dark:bg-slate-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-wrap gap-4">
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
                          data-cy="firstLanguage"
                          startContent={<Flag />}
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
                            : "Select First Language"}
                          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
                                  value={language.name}
                                  key={language.id}
                                  data-cy={`firstLanguage-${language.id}`}
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
                          data-cy="secondLanguage"
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
                          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
                                  value={language.name}
                                  key={language.id}
                                  data-cy={`secondLanguage-${language.id}`}
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
                      id="folders"
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
                        <SelectItem key={folder.id} value={field.value} id={`folders-${folder.id}`}>
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

          <div className="flex items-center justify-between">
            <div>
              <h4>Word List</h4>
              <p className="text-[0.8rem] text-muted-foreground">
                Add your words in different languages &#40;min.{" "}
                <strong>5</strong> words&#41;
              </p>
            </div>
            <ImportWords append={append} existingWords={fields} />
          </div>
          <div className="mt-4 flex justify-between space-y-2">
            <Sortable
              value={fields}
              onMove={({ activeIndex, overIndex }) =>
                move(activeIndex, overIndex)
              }
            >
              <div className="w-full space-y-2">
                {fields.map((field, index) => (
                  <SortableItem key={field.id} value={field.id} asChild>
                    <div className="flex w-full items-center gap-4">
                      <div className="divItem flex w-full gap-20">
                        <FormField
                          control={control}
                          name={`words.${index}.originalWord`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  data-cy={`originalWord-${index}`}
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
                                  data-cy={`translatedWord-${index}`}
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
                        className="size-2 shrink-0 text-black  hover:bg-white/20 hover:text-white"
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
            <div className="text-sm text-red-500">{errors.words.message}</div>
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
              className="w-fit text-sm font-bold text-black"
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
