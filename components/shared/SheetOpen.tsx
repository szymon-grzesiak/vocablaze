"use client";

import { useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { FancyMultiSelect } from "@/components/shared/FancyMultiSelect";
import { Button as ShadcnButton } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { hexToRgb } from "@/helpers/file";
import { updateFolder } from "@/lib/actions/action"; // Adjust as necessary
import { cn } from "@/lib/utils";
import { FolderType, IWordSetType } from "@/types";

import DeleteButton from "../ui/delete-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import WordSetsList from "./WordSetList";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { Edit } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { z } from "zod";

const UpdateFolderSchema = z.object({
  name: z.string().min(1, "Folder name is required"),
  color: z.string().min(1, "Color is required"),
  wordSets: z.array(z.string()).optional(),
});

const SheetOpen = ({
  folder,
  wordSets,
}: {
  folder: FolderType;
  wordSets: IWordSetType[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [currentFolder, setCurrentFolder] = useState(folder);

  const wordSetsInFolder = wordSets.filter((wordSet) =>
    wordSet.folders?.some((folderItem) => folderItem.id === folder.id)
  );

  const formMethods = useForm<z.infer<typeof UpdateFolderSchema>>({
    resolver: zodResolver(UpdateFolderSchema),
    defaultValues: {
      name: currentFolder.name,
      color: String(currentFolder.color),
      wordSets: wordSetsInFolder.map((wordSet) => wordSet.id),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods;

  const handleFolderClick = () => {
    setOpen(true);
  };

  const handleCloseSheet = () => {
    setOpen(false);
    setEditMode(false);
    reset();
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
    if (!editMode) {
      reset({
        name: currentFolder.name,
        color: String(currentFolder.color),
        wordSets: wordSetsInFolder.map((wordSet) => wordSet.id),
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof UpdateFolderSchema>) => {
    const updatedFolderData = {
      id: currentFolder.id,
      name: data.name,
      color: data.color,
      wordSets: data.wordSets,
    };

    try {
      const result = await updateFolder(updatedFolderData as any);

      if (result.success) {
        setEditMode(false);
        setCurrentFolder((prevFolder) => ({
          ...prevFolder,
          name: data.name,
          color: data.color,
        }));
      } else {
        throw new Error("An error occurred while updating the folder");
      }
    } catch (error) {
      throw new Error("An error occurred while updating the folder");
    }
  };

  const wordSetItems = wordSets.map((wordSet) => ({
    value: wordSet.id,
    label: wordSet.title,
  }));

  return (
    <>
      <li
        key={currentFolder.id}
        className={cn(
          "h-28 w-32 flex justify-end items-center flex-col hover:opacity-80 rounded-md cursor-pointer shadow-xl"
        )}
        style={{
          backgroundColor: `${hexToRgb(String(currentFolder.color))}`,
        }}
        onClick={handleFolderClick}
      >
        {wordSetsInFolder.length > 0 ? (
          <FcOpenedFolder className="mb-3 size-10" />
        ) : (
          <FcFolder className="mb-3 size-10" />
        )}
        <div className="w-full truncate rounded-b-md bg-black/60 px-2 text-center text-xl font-bold text-white">
          {currentFolder.name}
        </div>
      </li>
      {isDesktop ? (
        <Sheet open={open} onOpenChange={handleCloseSheet}>
          <SheetContent side="left">
            <SheetHeader className="h-[90%]">
              <div className="flex items-center justify-start gap-4 pb-4">
                <SheetTitle className="text-2xl font-bold">
                  {currentFolder.name}
                </SheetTitle>
                <ShadcnButton
                  className="bg-blue-600 px-3 hover:bg-blue-600/80"
                  onClick={handleEditModeToggle}
                >
                  {editMode ? "Cancel" : <Edit className="size-4" />}
                </ShadcnButton>
              </div>
              {editMode ? (
                <FormProvider {...formMethods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Folder Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter folder name"
                              className="w-full"
                            />
                          </FormControl>
                          {errors.name && (
                            <FormMessage>{errors.name.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Folder Color</FormLabel>
                          <FormControl>
                            <input
                              type="color"
                              {...field}
                              className="h-10 w-full cursor-pointer border-none p-0"
                            />
                          </FormControl>
                          {errors.color && (
                            <FormMessage>{errors.color.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="wordSets"
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Word Sets</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              items={wordSetItems}
                              value={field.value as string[]}
                              onChange={field.onChange}
                              placeholder="Select word sets..."
                            />
                          </FormControl>
                          {errors.wordSets && (
                            <FormMessage>{errors.wordSets.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <ShadcnButton
                      type="submit"
                      className="mt-4 bg-green-600 hover:bg-green-600/80"
                    >
                      Save Changes
                    </ShadcnButton>
                  </form>
                </FormProvider>
              ) : wordSetsInFolder.length > 0 ? (
                <WordSetsList
                  wordSets={wordSetsInFolder}
                  className="h-full"
                  liStyle="mx-0 bg-black/10 mr-6"
                />
              ) : (
                <span>No word sets found in this folder</span>
              )}
            </SheetHeader>
            <SheetFooter className="absolute bottom-0 left-1/2 mb-4 pb-4">
              <DeleteButton folderId={currentFolder.id} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer open={open} onOpenChange={handleCloseSheet}>
          <DrawerContent className="min-h-[50%]">
            <DrawerHeader>
              <div className="flex items-center justify-between">
                <DrawerTitle>{currentFolder.name}</DrawerTitle>
                <ShadcnButton
                  className="bg-blue-600 px-3 hover:bg-blue-600/80"
                  onClick={handleEditModeToggle}
                >
                  {editMode ? "Cancel" : <Edit className="size-4" />}
                </ShadcnButton>
              </div>
            </DrawerHeader>
            <div className="p-4">
              {editMode ? (
                <FormProvider {...formMethods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Folder Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter folder name"
                              className="w-full"
                            />
                          </FormControl>
                          {errors.name && (
                            <FormMessage>{errors.name.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="color"
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Folder Color</FormLabel>
                          <FormControl>
                            <input
                              type="color"
                              {...field}
                              className="h-10 w-full cursor-pointer border-none p-0"
                            />
                          </FormControl>
                          {errors.color && (
                            <FormMessage>{errors.color.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    {/* Word Sets Multi-Select */}
                    <FormField
                      name="wordSets"
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Word Sets</FormLabel>
                          <FormControl>
                            <FancyMultiSelect
                              items={wordSetItems}
                              value={field.value as string[]}
                              onChange={field.onChange}
                              placeholder="Select word sets..."
                            />
                          </FormControl>
                          {errors.wordSets && (
                            <FormMessage>{errors.wordSets.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <ShadcnButton
                      type="submit"
                      className="mt-4 bg-green-600 hover:bg-green-600/80"
                    >
                      Save Changes
                    </ShadcnButton>
                  </form>
                </FormProvider>
              ) : wordSetsInFolder.length > 0 ? (
                <WordSetsList
                  wordSets={wordSetsInFolder}
                  liStyle="mx-0 bg-black/10 mr-6"
                />
              ) : (
                <span>No word sets found in this folder</span>
              )}
            </div>
            <DrawerFooter className="absolute bottom-0 left-1/2 my-4">
              <DeleteButton folderId={currentFolder.id} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SheetOpen;
