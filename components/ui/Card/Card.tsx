"use client";

import { AddWordSetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Card,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
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

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  languages: { id: string; name: string }[];
  text?: string;
  buttonText?: string;
}

type Schema = z.infer<typeof AddWordSetSchema>;

export const CardComponent = ({
  buttonText = "Click",
  text = "Welcome to San Diego",
  languages,
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
    },
  });

  const { fields, append, remove, move } = useFieldArray({
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
      // Show success message to the user or redirect
    }
  };

  return (
    <Card
      radius="lg"
      className="border-none w-full md:w-[70%] banner-custom mb-20"
    >
      <CardFooter className="flex flex-col gap-6 items-start before:bg-white/10 h-fit overflow-hidden px-6 rounded-none z-10">
        <div className="flex gap-4 justify-center items-center">
          <Bookmark className="w-10 h-10 text-black fill-white/60" />
          <h1 className="text-[36px] font-bold [text-shadow:_1px_1px_1px_rgb(255_0_255_/_40%)]">
            {text}
          </h1>
        </div>
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
        <Controller
          name="firstLanguageId"
          control={control}
          render={({ field }) => (
            <Autocomplete
            value={field.value}
            onChange={field.onChange}
              className="max-w-xs"
              label="First Language"
            >
              {languages.map((language) => (
                <AutocompleteItem key={language.id} value={language.id}>
                  {language.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        />
        <Controller
          name="secondLanguageId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              value={field.value}
              onChange={field.onChange}
              className="max-w-xs"
              label="Second Language"
            >
              {languages.map((language) => (
                <AutocompleteItem key={language.id} value={language.id}>
                  {language.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          )}
        />
      </CardFooter>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h4>Word List</h4>
            <p className="text-[0.8rem] text-muted-foreground">
              Add your words in different languages
            </p>
          </div>
          <ImportWords append={append} existingWords={fields} />
        </div>
        <div className="space-y-2 mt-4">
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
                      variant="solid"
                      isIconOnly
                      className="size-2 shrink-0 bg-red-500/20"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon
                        className="size-4 text-destructive"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </SortableItem>
              ))}
            </div>
          </Sortable>
          <Button
            type="button"
            variant="faded"
            size="sm"
            className="w-fit"
            onClick={() => append({ original_word: "", translated_word: "" })}
          >
            Add word
          </Button>
        </div>
        <Button type="submit" className="w-fit mt-4">
          Submit
        </Button>
      </form>
    </Card>
  );
};
