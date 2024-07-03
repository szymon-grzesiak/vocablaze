"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { ArrowRight, BookIcon, PlusIcon } from "lucide-react";
//@ts-ignore
import { useCountries } from "use-react-countries";

import { DownloadCircle01Icon } from "@/components/icons/Icon";

const Page = () => {
  const { countries } = useCountries();
  const [england, spain] = countries.filter(
    (country: any) => country.name === "United Kingdom" || country.name === "Spain"
  );

  return (
    <div className="relative px-6 py-8 md:px-12 md:py-12 bg-white rounded-lg flex flex-col w-full justify-center mt-8 drop-shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Edit Everyday Vocabulary
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Update the vocabulary words and translations
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            className="border-black text-black hover:bg-black hover:text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            size="lg"
            variant="flat"
          >
            <DownloadCircle01Icon />
            Import Words
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <BookIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Vocabulary Words
              </h3>
            </div>
            <div className="flex justify-center items-center gap-4">
                <p>Change</p>
              <Image
                src={england.flags.png}
                width={55}
                height={10}
                alt="flag"
                className="rounded-lg border-2 border-black"
              />
              <ArrowRight className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <Image
                src={spain.flags.png}
                width={50}
                height={10}
                alt="flag"
                className="rounded-lg border-2 border-black"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b-2 border-b-gray-300">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Hello
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Hola</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b-2 border-b-gray-300">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Thank you
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Gracias
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b-2 border-b-gray-300">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Excuse me
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Perdón</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b-2 border-b-gray-300">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Good morning
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Buenos días
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b-2 border-b-gray-300">
              <div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  Goodbye
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Adiós</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button
          variant="flat"
          color="success"
          className="p-4 w-fit flex justify-center"
        >
          Add more <PlusIcon />
        </Button>
      </div>
      <div className="flex justify-end mt-8">
        <div className="space-x-4">
          <Button
            className="border-black text-black hover:bg-black hover:text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            variant="flat"
          >
            Cancel
          </Button>
          <Button className="border-black bg-black text-white hover:bg-gray-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
