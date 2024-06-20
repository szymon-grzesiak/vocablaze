import Link from "next/link";
import { Button, Progress } from "@nextui-org/react";
import {
  BookIcon,
  EqualIcon,
  FlashlightIcon,
  GamepadIcon,
  HammerIcon,
  Trash,
} from "lucide-react";

import { Delete02Icon, PencilEdit02Icon, Share01Icon } from "@/components/icons";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="relative bg-white rounded-lg flex flex-col w-full justify-center xl:px-0 mt-8 drop-shadow-lg">
      <div className="px-6 py-8 md:px-12 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Everyday Vocabulary {params.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Learn essential everyday words and phrases
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button isIconOnly className="p-0 w-fit">
              <div className=" flex bg-blue-200 justify-center items-center w-full h-full rounded-md p-1">
                <Share01Icon />
              </div>
            </Button>
            <Button isIconOnly className="p-0 w-fit">
              <div className=" flex justify-center items-center w-full h-full rounded-md p-1">
                <PencilEdit02Icon />
              </div>
            </Button>
            <Button isIconOnly className="p-0 w-fit">
              <div className="bg-red-200 hover:bg-red-400 flex justify-center items-center w-full h-full rounded-md p-1">
                <Delete02Icon />
              </div>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BookIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Vocabulary Words
                </h3>
              </div>
              <Progress className="w-32" value={75} />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Hello
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">Hola</span>
                </div>
                <Progress className="w-24" value={90} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Thank you
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Gracias
                  </span>
                </div>
                <Progress className="w-24" value={80} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Excuse me
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Perdón
                  </span>
                </div>
                <Progress className="w-24" value={75} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Good morning
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Buenos días
                  </span>
                </div>
                <Progress className="w-24" value={85} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Goodbye
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Adiós
                  </span>
                </div>
                <Progress className="w-24" value={92} />
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GamepadIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Practice Games
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Link
                className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                href="#"
              >
                <HammerIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Hangman
                </span>
              </Link>
              <Link
                className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                href="#"
              >
                <EqualIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Matching
                </span>
              </Link>
              <Link
                className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                href="#"
              >
                <FlashlightIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">
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

export default Page;

