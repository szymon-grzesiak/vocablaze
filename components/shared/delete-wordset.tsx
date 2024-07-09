"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FileWarning } from "lucide-react";
import { toast } from "sonner";

import { deleteWordSet } from "@/lib/actions/action";
import { Delete02Icon } from "@/components/icons";

export default function DeleteModal({
  name,
  id,
  type,
}: {
  name: string;
  id: string;
  type: "wordset" | "folder";
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = async () => {
    try {
      await deleteWordSet(id);
      toast.success(`${type} of name: ${name} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete ${type} of name: ${name}`);
      console.error("Failed to delete", error);
    }
  };

  return (
    <>           

      <Button isIconOnly onPress={onOpen}>
        <Delete02Icon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="p-3 pl-5 m-0 box-border">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-0 m-0 box-border">
                Delete - {type}
              </ModalHeader>
              <ModalBody className="flex flex-row items-center px-0 pt-4 m-0 box-border">
                <FileWarning className="w-16 h-16 text-red-500" />
                <div className="flex flex-col">
                  <p className="text-lg">
                    You are about to delete: <strong>{name}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Are you 100% sure?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="p-0 m-0 box-border">
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onClick={handleClick}
                  onPress={onClose}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
