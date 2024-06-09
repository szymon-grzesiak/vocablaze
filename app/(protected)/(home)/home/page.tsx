"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
//@ts-ignore
import { useCountries } from "use-react-countries";
import { LineChart } from "../../_components/line-chart-icon";

const Home = () => {
  const { countries } = useCountries();
  const wordSets = countries.slice(0, 5); // Get 5 countries to avoid index out of range

  return (
    <>
      <div className="relative flex flex-col w-full justify-center xl:px-0 mt-8 drop-shadow-lg">
        <div className="flex flex-col lg:flex-row w-full h-full gap-4">
          <div className="flex flex-col lg:w-1/3 gap-4">
            <div className="relative h-full">
              <div className="relative h-full p-5 bg-white rounded-lg">
                <span className="flex justify-between">
                  <span className="text-2xl font-bold">🌍Word Sets</span>
                  <Input
                    type="text"
                    startContent={
                      <MagnifyingGlassIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    isClearable
                    placeholder="Search"
                    className="max-w-40 w-full"
                  />
                </span>

                <ul className="pt-5">
                  {wordSets.map(
                    (
                      {
                        name,
                        flags,
                      }: { name: string; flags: { png: string; svg: string } },
                      index: number
                    ) => (
                      <li
                        key={name}
                        className="mb-4 bg-slate-400/20 rounded-md p-2"
                      >
                        <section className="flex gap-x-4">
                          <p>Set #{index + 1}</p>
                          <div className="flex justify-between">
                            <div className="flex ">
                              <Image
                                src={flags.png}
                                alt={name}
                                width={30}
                                height={30}
                              />
                              <span className="ml-2">{name}</span>
                            </div>
                            <span className="px-4">➡️</span>
                            <div className="flex ">
                              <span className="flex gap-4">
                                <Image
                                  src={
                                    wordSets[(index + 1) % wordSets.length]
                                      .flags.png
                                  }
                                  alt={name}
                                  width={30}
                                  height={30}
                                />
                                {wordSets[(index + 1) % wordSets.length].name}
                              </span>
                            </div>
                          </div>
                        </section>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="hidden lg:block relative h-fit p-5 bg-white rounded-lg dark:bg-gray-700">
              <span className="text-2xl font-bold"> 💲Premium Access</span>
              <p className="text-gray-600 dark:text-gray-400">
                Unlock all language games and features with a Premium
                subscription.
              </p>
              <div className="w-full flex justify-end">
                <Button
                  className="border-black text-black hover:bg-black hover:text-white font-bold px-4 rounded-lg transition-colors duration-300 mt-3"
                  variant="flat"
                >
                  Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-2/3 gap-4">
            <div className="hidden lg:block relative h-[350px] w-full bg-white p-5 rounded-lg">
              <span className="text-2xl font-bold">
                📚Your learning history
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative h-full w-full lg:w-1/2 gap-4">
                <div className="hidden lg:flex justify-around flex-col p-5 h-full bg-white rounded-lg">
                  <span className="text-2xl font-bold">📈 Monthly trends</span>
                  <div className=" dark:bg-gray-800 rounded-lg p-6">
                    <LineChart className="h-[130px]" />
                  </div>
                  <div className="w-full flex justify-center">
                    <Button
                      className="border-black text-black hover:bg-black hover:text-white font-bold px-4 rounded-lg transition-colors duration-300 mt-3"
                      variant="flat"
                    >
                      Check out more ➡️ 
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative w-full lg:w-1/2">
                <div className="relative h-full p-5 bg-white rounded-lg">
                  <span className="flex justify-between">
                    <span className="text-2xl font-bold">📁Folders</span>
                    <Input
                      type="text"
                      startContent={
                        <MagnifyingGlassIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      isClearable
                      placeholder="Search"
                      className="max-w-40 w-full"
                    />
                  </span>
                  <div className="flex flex-wrap w-full gap-4 mt-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-yellow-500/30 rounded-md border-b-1 border-r-1 border-b-gray-400 border-r-gray-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
