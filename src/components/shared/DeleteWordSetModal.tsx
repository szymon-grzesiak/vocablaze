"use client";

import React from "react";

import { Delete02Icon } from "@/components/icons";
import { deleteWordSet } from "@/lib/actions/action";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FileWarning } from "lucide-react";
import { toast } from "sonner";

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
    }
  };

  return (
    <>
      <Tooltip content="Delete words set">
        <Button isIconOnly onPress={onOpen}>
          <Delete02Icon className="text-red-500" />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="m-0 box-border p-3 pl-5">
          {(onClose) => (
            <>
              <ModalHeader className="m-0 box-border flex flex-col gap-1 p-0">
                Delete - {type}
              </ModalHeader>
              <ModalBody className="m-0 box-border flex flex-row items-center px-0 pt-4">
                <FileWarning className="size-16 text-red-500" />
                <div className="flex flex-col">
                  <p className="text-lg">
                    You are about to delete: <strong>{name}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Are you 100% sure?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="m-0 box-border p-0">
                <Button variant="flat" onPress={onClose} className="text-medium font-bold">
                  Close
                </Button>
                <Button color="danger" onClick={handleClick} onPress={onClose} className="text-medium font-bold">
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
