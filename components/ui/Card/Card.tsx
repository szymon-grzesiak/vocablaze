"use client";

import { AddWordSetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardFooter, Input, Spinner } from "@nextui-org/react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import {
  Flag,
  FlagIcon,
  Folder,
  Plus,
  PlusCircle,
  TrashIcon,
} from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { set, z } from "zod";

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

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
  languages: { id: string; name: string }[];
  folders: { id: string; name: string; color: string | null; userId: string }[];
  text?: string;
  buttonText?: string;
}

type Schema = z.infer<typeof AddWordSetSchema>;

export const CardComponent = ({
  text = "Welcome to San Diego",
  languages,
  folders,
}: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openFirstLang, setOpenFirstLang] = useState(false);
  const [openSecLang, setOpenSecLang] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(AddWordSetSchema),
    defaultValues: {
      words: [
        {
          original_word: "",
          translated_word: "",
        },
      ],
      title: "",
      description: "",
      firstLanguageId: "",
      secondLanguageId: "",
      folderId: "",
    },
  });
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const { fields, append, prepend, remove, move } = useFieldArray({
    control,
    name: "words",
  });

  const onSubmit = (input: Schema) => {
    const uniqueWords = new Set<string>();
    const words = input.words.filter(({ original_word, translated_word }) => {
      const key = `${original_word}-${translated_word}`;
      if (uniqueWords.has(key)) return false;
      uniqueWords.add(key);
      return true;
    });

    setIsLoading(true);
    addWordSet({ ...input, words }).then((response) => {
      if (response.success) {
        toast.success(response.success);
        router.push("/home");
      } else {
        toast.error(response.error);
      }
      setIsLoading(false);
    });
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
                    className="bg-white/60 rounded-md text-3xl text-black dark:text-white"
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
                    className="bg-white/60 rounded-md h-[150px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
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
                            "w-[250px] justify-between bg-white/50",
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
                            "w-[270px] justify-between bg-white/50",
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
              name="folderId"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={openFolder} onOpenChange={setOpenFolder}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="shadow"
                          role="combobox"
                          startContent={<Folder />}
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
                              {folders?.map((folder) => (
                                <CommandItem
                                  value={folder.id}
                                  key={folder.id}
                                  onSelect={() => {
                                    field.onChange(folder.id);
                                    setOpenFolder(false);
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
                          name={`words.${index}.original_word`}
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
                          name={`words.${index}.translated_word`}
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
          {errors.words && (
            <div className="text-red-500 text-sm">{errors.words.message}</div>
          )}
          <div className="flex justify-between pt-4">
            <Button type="submit" className="w-fit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Create"}
            </Button>
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
      </Form>
    </Card>
  );
};
