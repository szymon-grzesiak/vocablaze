import { Delete02Icon, PencilEdit02Icon, Share01Icon } from "@/components/icons";

import { Button, Progress } from "@nextui-org/react";
import {
  BookIcon,
  EqualIcon,
  FlashlightIcon,
  GamepadIcon,
  HammerIcon,
} from "lucide-react";
import Link from "next/link";

const Details = () => {
  return (
    <div className="relative mt-8 flex w-full flex-col justify-center rounded-lg bg-white drop-shadow-lg xl:px-0">
      <div className="px-6 py-8 md:p-12">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
              Everyday Vocabulary
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Learn essential everyday words and phrases
            </p>
          </div>
          <div className="mt-4 flex gap-3 md:mt-0">
            <Button isIconOnly className="w-fit p-0">
              <div className="flex size-full items-center justify-center rounded-md bg-blue-200 p-1">
                <Share01Icon />
              </div>
            </Button>
            <Button isIconOnly className="w-fit p-0">
              <div className="flex size-full items-center justify-center rounded-md p-1">
                <PencilEdit02Icon />
              </div>
            </Button>
            <Button isIconOnly className="w-fit p-0">
              <div className="flex size-full items-center justify-center rounded-md bg-red-200 p-1 hover:bg-red-400">
                <Delete02Icon />
              </div>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookIcon className="size-8 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Vocabulary Words
                </h3>
              </div>
              <Progress label='' className="w-32" value={75} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Hello
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">Hola</span>
                </div>
                <Progress label='' className="w-24" value={90} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Thank you
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Gracias
                  </span>
                </div>
                <Progress label='' className="w-24" value={80} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Excuse me
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Perdón
                  </span>
                </div>
                <Progress label='' className="w-24" value={75} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Good morning
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Buenos días
                  </span>
                </div>
                <Progress label='' className="w-24" value={85} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Goodbye
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Adiós
                  </span>
                </div>
                <Progress label='' className="w-24" value={92} />
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GamepadIcon className="size-8 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Practice Games
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Link
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                href="#"
              >
                <HammerIcon className="size-8 text-gray-900 dark:text-gray-50" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Hangman
                </span>
              </Link>
              <Link
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                href="#"
              >
                <EqualIcon className="size-8 text-gray-900 dark:text-gray-50" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Matching
                </span>
              </Link>
              <Link
                className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                href="#"
              >
                <FlashlightIcon className="size-8 text-gray-900 dark:text-gray-50" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Flashcards
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
