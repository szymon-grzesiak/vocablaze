"use client";

// CustomModal.jsx
import React, { useState } from "react";
import { AddFolderSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner, Tooltip } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button as ShadcnButton } from "../ui/button";
import { Folder } from "lucide-react";

interface CustomModalProps {
  responsive?: boolean;
  triggerIcon?: React.ReactNode;
  title: string;
  description: string;
  handleClick: (values: z.infer<typeof AddFolderSchema>) => void;
  onCloseDropdown?: () => void; // nowy prop
}

const CustomModal: React.FC<CustomModalProps> = ({
  responsive,
  triggerIcon,
  title,
  description,
  handleClick,
  onCloseDropdown, // obsługa prop
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

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
      setOpen(false);
      if (onCloseDropdown) {
        onCloseDropdown(); // zamykanie dropdown
      }
    } catch (error) {
      toast.error("Failed to add folder.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const ModalContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Input label="Folder Name" id="name" {...register("name")} />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
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
        aria-label="Create Folder"
      >
        {isLoading ? <Spinner /> : "Create"}
      </Button>
    </form>
  );

  return (
    <>
      {responsive ? (
        <ShadcnButton
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="ml-2 w-full flex  justify-start gap-3"
        >
          <Folder className="dark:text-gray-400 w-4 h-4" />
          Add a folder
        </ShadcnButton>
      ) : (
        <Tooltip content="Add a folder">
          <Button
            isIconOnly
            variant="flat"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            {triggerIcon}
          </Button>
        </Tooltip>
      )}

      {isDesktop ? (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {ModalContent}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={handleOpenChange}>
          <DrawerContent className="pb-10 px-10">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">{ModalContent}</div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <ShadcnButton variant="outline">Cancel</ShadcnButton>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default CustomModal;