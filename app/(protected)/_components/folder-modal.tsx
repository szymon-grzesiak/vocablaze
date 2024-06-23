"use client";

import React, { useState } from "react";
import { AddFolderSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner, Tooltip } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CustomModalProps {
  triggerIcon: React.ReactNode;
  title: string;
  description: string;
  handleClick: (values: z.infer<typeof AddFolderSchema>) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  triggerIcon,
  title,
  description,
  handleClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof AddFolderSchema>>({
    resolver: zodResolver(AddFolderSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof AddFolderSchema>> = async (
    values
  ) => {
    setIsLoading(true);
    try {
      handleClick(values);
      toast.success("Folder added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add folder.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip content="Add a folder">
        <DialogTrigger asChild>
          <Button isIconOnly variant="flat">
            {triggerIcon}
          </Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Input label="Folder Name" id="name" {...register("name")} />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <input
              className="w-full rounded-xl cursor-pointer"
              type="color"
              id="color"
              {...register("color")}
            />
          </div>
          <Button
            color="success"
            className="font-bold"
            type="submit"
            variant="shadow"
            disabled={isLoading}
            aria-label="Close"
          >
            {isLoading ? <Spinner /> : "Create"}
          </Button>{" "}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
