"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardFooter, Input } from "@nextui-org/react";
import { TrashIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Bookmark } from "@/components/icons";
import { Textarea } from "../textarea";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/ui/sortable";
import Background from "./card-background";
import "./Background.css";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  buttonText?: string;
}

const schema = z.object({
  words: z.array(
    z.object({
      original_word: z.string(),
      translated_word: z.string(),
    })
  ),
});

type Schema = z.infer<typeof schema>;

export const CardComponent = ({
  buttonText = "Click",
  text = "Welcome to San Diego",
  children,
  className,
}: CardProps) => {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      words: [
        {
          original_word: "Hello",
          translated_word: "Hola",
        },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "words",
  });

  function onSubmit(input: Schema) {
    console.log({ input });
  }

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
          type="email"
          variant="bordered"
          label="Title"
          size="lg"
          className="bg-white/60 rounded-md text-3xl text-black dark:text-white"
        />
        <Textarea
          placeholder="Enter your description"
          className="bg-white/60 rounded-md h-[150px]"
        />
      </CardFooter>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
        <div className="space-y-1">
          <h4>Word List</h4>
          <p className="text-[0.8rem] text-muted-foreground">
            Add your words in different languages
          </p>
        </div>
        <div className="space-y-2">
          <Sortable
            value={fields}
            onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
          >
            <div className="w-full space-y-2">
              {fields.map((field, index) => (
                <SortableItem key={field.id} value={field.id} asChild>
                  <div className="w-full flex gap-4 items-center">
                    <div className="w-full flex gap-20 divItem">
                    <Input
                      className="h-8 text-blue-500"
                      {...form.register(`words.${index}.original_word` as const)}
                      placeholder="First Language"
                      variant="underlined"
                    />
                    <Input
                      className="h-8"
                      {...form.register(`words.${index}.translated_word` as const)}
                      placeholder="Second Language"
                      variant="underlined"
                    />
                    </div>
                   
                    <SortableDragHandle className="cursor-move">
                      <DragHandleDots2Icon/>
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
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Card>
  );
};
