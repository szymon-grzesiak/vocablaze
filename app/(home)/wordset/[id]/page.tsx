import React from "react";

import { PencilEdit02Icon } from "@/components/icons";
import ClientWordSet from "@/components/shared/ClientWordSet";
import DeleteWordSet from "@/components/shared/DeleteWordSetModal";
import ExportWords from "@/components/shared/ExportWords";
import NotFound from "@/components/shared/NotFound";
import { getWordSetById } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { cn } from "@/lib/utils";

import { Button, Tooltip } from "@nextui-org/react";
import {
  ArrowDown,
  CircleCheck,
  EqualIcon,
  GamepadIcon,
  Info,
  SquareStackIcon,
} from "lucide-react";
import Link from "next/link";
import { GiSuicide } from "react-icons/gi";

const Page = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();
  const { wordSet, error } = await getWordSetById(
    params.id,
    currUser?.id as string
  );
  if (!wordSet) return <NotFound message={error} />;

  return (
    <div className="mx-auto mb-4 flex w-full flex-col justify-center rounded-none bg-black/5 px-6 py-7 backdrop-blur-2xl dark:bg-slate-900/90 lg:w-3/4 lg:rounded-lg">
      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
            {wordSet?.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {wordSet?.description}
          </p>
        </div>
        <div className="mt-4 flex w-full justify-start gap-3 md:mt-0 md:w-auto ">
          <ExportWords wordSet={wordSet} />
          <Tooltip content="Edit words set">
            <Button isIconOnly>
              <Link href={`${params.id}/edit`}>
                <PencilEdit02Icon className="dark:text-white" />
              </Link>
            </Button>
          </Tooltip>
          <DeleteWordSet
            id={params.id}
            type="wordset"
            name={wordSet?.title as string}
          />
        </div>
      </div>
      <ClientWordSet wordSet={wordSet} />
      <div className="grid grid-cols-1 gap-6 pt-4">
        <div className="rounded-lg bg-gray-100 py-6 dark:bg-gray-800">
          <div className="mb-4 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
            <div className="flex items-center justify-between space-x-2">
              <GamepadIcon className="size-8 shrink-0 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Practice Games
              </h3>
              <Tooltip
                color="primary"
                content="Games when you can gain progress are these with green colored icons"
              >
                <Info className="size-5 shrink-0 cursor-pointer text-blue-400" />
              </Tooltip>
              <p></p>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="size-6 shrink-0 text-green-500" />
              <p className="font-semibold text-gray-500">
                Start session by choosing one of the available games :{" "}
              </p>
              <ArrowDown className="size-6 shrink-0 animate-bounce text-gray-900 dark:text-gray-50" />
            </div>
            <div className="w-1/6" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Link
              className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              href={`${params.id}/flashcards`}
            >
              <SquareStackIcon className="size-8 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Flashcards
              </span>
            </Link>
            <Link
              className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              href={`${params.id}/matching`}
            >
              <EqualIcon className="size-8 text-gray-900 dark:text-gray-50" />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Matching
              </span>
            </Link>

            {currUser?.role === "PRO" ? (
              <Link
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                href={`${params.id}/hangman`}
              >
                <GiSuicide className="size-8 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Hangman
                </span>
              </Link>
            ) : (
              <div className="relative size-full rounded-lg">
                <div className="absolute left-[-3%] top-[-20%] z-50 rounded-full border-5 bg-red-400 p-2 font-bold text-gray-100 shadow-xl">
                  PRO
                </div>
                <Button
                  className={cn("flex flex-col items-center justify-center p-4 shadow-sm", "h-full w-full")}
                  variant={"flat"}
                  disabled
                >
                  <GiSuicide className="size-8 text-green-600" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Hangman
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
