"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
//@ts-ignore
import { useCountries } from "use-react-countries";

import { LineChart, LineChartIcon } from "../../_components/line-chart-icon";

const Home = () => {
  const { countries } = useCountries();
  console.log(countries);
  const wordSets = countries.slice(0, 5); // Get 5 countries to avoid index out of range

  return (
    <div className="relative flex flex-col w-full justify-center xl:px-0 mt-8 drop-shadow-lg">
      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        <div className="flex flex-col md:w-1/3 gap-4">
          <div className="relative h-48">
            <div className="relative h-full p-5">
              <h1 className="font-bold text-3xl">Welcome, Szymon!</h1>
              <span className="text-lg">
                Make your day by learning new words
              </span>
            </div>
          </div>
          <div className="relative h-fit">
            <div className="relative h-full p-5 bg-white rounded-lg">
              <span className="text-2xl font-bold">🌍Word Sets</span>
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
                      <section>
                        <h2 className="flex justify-between">
                          <span>Zestaw #{index + 1}</span>
                          <span className="flex gap-4">
                            <Image
                              src={flags.png}
                              alt={name}
                              width={30}
                              height={10}
                            />
                            {name}
                          </span>
                          ➡️
                          <span className="flex gap-4">
                            <Image
                              src={
                                wordSets[(index + 1) % wordSets.length].flags
                                  .png
                              }
                              alt={name}
                              width={30}
                              height={10}
                            />
                            {wordSets[(index + 1) % wordSets.length].name}
                          </span>
                        </h2>
                      </section>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-2/3 gap-4">
          <div className="relative h-[220px]">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white p-5 rounded-lg">
              <span className="text-2xl font-bold">
                📚Your learning history
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:h-72 gap-4">
            <div className="flex flex-col w-full md:w-1/2 gap-4">
              <div className="relative h-fit">
                <div className="relative h-full p-5 bg-white rounded-lg">
                  <span className="text-2xl font-bold">
                    📈 Monthly trends
                  </span>
                  <div className=" dark:bg-gray-800 rounded-lg p-6">
                    <LineChart className=" h-[100px]" />
                  </div>
                </div>
              </div>
              <div className="relative h-fit">
                <div className="relative h-full p-5 bg-white rounded-lg dark:bg-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    💲Premium Access
                  </h3>
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
            </div>
            <div className="relative h-fit w-full md:w-1/2">
              <div className="relative h-full p-5 bg-white  rounded-lg">
                <span className="text-2xl font-bold">📁Folders</span>
                <div className="flex flex-wrap w-full gap-4 mt-4">
                  {Array.from({ length: 12 }).map((_, index) => (
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
  );
};

// jak bede chcial sie pozbyc obramowania to musze usunac relative z boxa
{
  /* <div className={`relative h-1/3`}> */
}

export default Home;
