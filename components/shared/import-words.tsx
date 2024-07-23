"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Import, Paperclip, Trash2 } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";

interface ImportWordsProps {
  append: (value: { originalWord: string; translatedWord: string }) => void;
  existingWords: { originalWord: string; translatedWord: string }[];
}

export const ImportWords = ({ append, existingWords }: ImportWordsProps) => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleFileRead = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleTextImport = (event: React.FormEvent) => {
    event.preventDefault();
    const existingWordsSet = new Set(
      existingWords.map(
        ({ originalWord, translatedWord }) =>
          `${originalWord}-${translatedWord}`
      )
    );
    const lines = fileContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    lines.forEach((line) => {
      const [originalWord, translatedWord] = line
        .split(",")
        .map((word) => word.trim());
      const key = `${originalWord}-${translatedWord}`;
      if (originalWord && translatedWord && !existingWordsSet.has(key)) {
        append({ originalWord, translatedWord });
        existingWordsSet.add(key);
      }
    });
    setFileContent("");
    setFileName("");
    setOpen(false);
  };

  const handleFileRemove = () => {
    setFileContent("");
    setFileName("");
  };

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              color="secondary"
              variant="flat"
              startContent={<Import />}
              className="text-black dark:text-gray-200 bg-transparent/10"
            >
              Import
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Import words</DialogTitle>
              <DialogDescription>
                Choose to add words from a file or manually input them.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <Button
                type="button"
                variant="shadow"
                color="secondary"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="w-fit"
                startContent={<Paperclip className="size-5" />}
              >
                Choose file
              </Button>
              <p>or</p>
              <input
                id="file-upload"
                type="file"
                accept=".txt,.csv"
                onChange={handleFileRead}
                className="hidden"
              />
              <Textarea
                placeholder="Paste words here, format: original,translated"
                className="bg-white/60 rounded-md h-[150px] mt-2"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
              />
              <div className="flex gap-2 mt-2 justify-between">
                <Button
                  color="secondary"
                  variant="flat"
                  startContent={<Import className="size-5"/>}
                  onClick={handleTextImport}
                  className="text-black bg-transparent/10"
                >
                  Import
                </Button>
                <Button
                  type="button"
                  onClick={handleFileRemove}
                  color="danger"
                  variant="shadow"
                  className="w-fit"
                  isIconOnly
                >
                  <Trash2 className="size-5"/>
                </Button>
              </div>
              {fileName && (
                <p className="text-sm text-muted-foreground mt-2">
                  File: {fileName}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="faded">Import words</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Import words</DrawerTitle>
              <DrawerDescription>
                Choose to add words from a file or manually input them.
              </DrawerDescription>
            </DrawerHeader>
            <div className="mt-4 space-y-4 px-4">
              <Button
                type="button"
                variant="faded"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="w-fit"
              >
                Import from file
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".txt,.csv"
                onChange={handleFileRead}
                className="hidden"
              />
              <Textarea
                placeholder="Paste words here, format: original,translated"
                className="bg-white/60 rounded-md h-[150px] mt-2"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  onClick={handleTextImport}
                  className="w-fit"
                >
                  Import
                </Button>
                <Button
                  type="button"
                  onClick={handleFileRemove}
                  className="w-fit bg-red-500/20"
                >
                  Remove File
                </Button>
              </div>
              {fileName && (
                <p className="text-sm text-muted-foreground mt-2">
                  File: {fileName}
                </p>
              )}
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
