import { Fragment } from "react";
import Link from "next/link";
import { Button, Divider, Progress, Tooltip } from "@nextui-org/react";
import {
  ArrowDown,
  BookIcon,
  CircleCheck,
  EqualIcon,
  FlashlightIcon,
  GamepadIcon,
  HammerIcon,
} from "lucide-react";

import { getWordSetById } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { PencilEdit02Icon } from "@/components/icons";
import DeleteWordSet from "@/components/shared/delete-wordset";
import ExportWords from "@/components/shared/export-words";
import NotFound from "@/components/shared/NotFound";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = async ({ params }: { params: { id: string } }) => {
  const currUser = await currentUser();
  const { wordSet } = await getWordSetById(params.id, currUser?.id as string);
  if (!wordSet) return <NotFound />;

  const wordSetProgressSum = wordSet.words.reduce(
    (acc, word) => acc + word.progress,
    0
  );

  const wordSetProgressValue = Math.floor(
    (wordSetProgressSum / wordSet.words.length) * 100
  );

  console.log(wordSetProgressSum);
  return (
    <div className="bg-black/5 px-6 py-7 mb-4 backdrop-blur-2xl dark:bg-slate-900/90 w-full rounded-lg flex flex-col lg:w-3/4 justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {wordSet?.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {wordSet?.description}
          </p>
        </div>
        <div>
          Sort
          <div>
            Sort by progress
          </div>
          <div>
          Sort by date
          </div>
          <div>
            Sort by your own order
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
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
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-black/5 backdrop-blur-xl dark:bg-gray-800 rounded-lg pl-2 py-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <BookIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Word Set Details
              </h3>
            </div>
            <Progress
              classNames={{ track: "bg-gray-400" }}
              label={`${wordSetProgressValue} %`}
              color="success"
              className="w-32"
              value={wordSetProgressValue}
            />
          </div>
          <Divider className="h-[2px]" />
          <ScrollArea className="h-[400px]">
            {wordSet?.words.map((word, index) => (
              <Fragment key={index}>
                <div
                  className="flex items-center justify-between max-sm:flex-col max-sm:justify-start max-sm:items-start rounded-lg p-4"
                >
                  <div>
                    <p className="text-gray-900 font-bold dark:text-gray-100">
                      {word.originalWord}
                    </p>
                    <p className="text-gray-800 dark:text-gray-400">
                      {word.translatedWord}
                    </p>
                  </div>
                  <div className="flex gap-2 max-sm:flex-col">
                    <Progress
                      label={`${Math.floor(word.progress * 100)} %`}
                      className="w-32"
                      value={word.progress * 100}
                      classNames={{ track: "bg-gray-400" }}
                    />
                  </div>
                </div>
                {index !== wordSet.words.length - 1 &&
                  wordSet.words.length > 1 && (
                    <Divider className="h-[1px]" />
                  )
                }
              </Fragment>
            ))}
          </ScrollArea>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between space-x-2">
              <GamepadIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Practice Games
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="h-6 w-6 text-green-500" />
              <p className="font-semibold text-gray-500">
                Start session by choosing one of the available games :{" "}
              </p>
              <ArrowDown className="h-6 w-6 text-gray-900 dark:text-gray-50 animate-bounce" />
            </div>
            <div className="w-1/6" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Link
              className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              href={`${params.id}/flashcards`}
            >
              <FlashlightIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                Flashcards
              </span>
            </Link>
            <Link
              className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              href={`${params.id}/matching`}
            >
              <EqualIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                Matching
              </span>
            </Link>
            <Link
              className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              href={`${params.id}/hangman`}
            >
              <HammerIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                Hangman
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
