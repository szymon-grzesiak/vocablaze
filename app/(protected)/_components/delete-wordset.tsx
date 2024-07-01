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

import { Delete02Icon } from "@/components/icons";

export default function DeleteModal({
  name,
  type,
}: {
  name: string;
  type: "wordset" | "folder";
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly onPress={onOpen}>
        <Delete02Icon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-3 m-0 box-border">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-0 m-0 box-border">
                Delete - {type}
              </ModalHeader>
              <ModalBody className="flex flex-row justify-center items-center p-0 m-0 box-border">
                <FileWarning className="w-24 h-24 text-red-500" />
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
