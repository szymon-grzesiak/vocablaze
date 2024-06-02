"use client";

import React from "react";
import { Button } from "@nextui-org/button";
//@ts-ignore
import { useCountries } from "use-react-countries";

import Box from "../../_components/box";

const Home = () => {
  const { countries } = useCountries();
  const wordSets = countries.slice(0, 4); // Get 6 countries to avoid index out of range

  return (
    <>
      <div className="absolute top-0 left-0 px-10 pt-8 ">
        <h1 className="font-bold text-3xl">Welcome, Szymon!</h1>
        <span className="text-lg">Make your day by learning new words</span>
      </div>

      <div className="relative flex flex-col w-full justify-center h-screen xl:px-0 mt-8">
        <div className="flex flex-row w-full h-full gap-4">
          <div className="flex flex-col w-1/3 gap-4">
            <Box height="2/5" />
            <Box height="3/5">
              <span className="text-2xl font-bold">Word Sets</span>
              <ul className="pt-5">
                {wordSets
                  .slice(0, 5)
                  .map(
                    (
                      { name, emoji }: { name: string; emoji: string },
                      index: number
                    ) => (
                      <li
                        key={name}
                        className="mb-4 bg-slate-400/20 rounded-md p-2"
                      >
                        <section>
                          <h2 className="flex justify-between">
                            <span>Zestaw #{index + 1}</span>
                            <span>
                              {emoji} {name}
                            </span>{" "}
                            -&gt;{" "}
                            <span>
                              {wordSets[(index + 1) % wordSets.length].emoji}{" "}
                              {wordSets[(index + 1) % wordSets.length].name}
                            </span>
                          </h2>
                        </section>
                      </li>
                    )
                  )}
              </ul>
            </Box>
          </div>
          <div className="flex flex-col w-2/3 gap-4">
            <Box height="2/5" />
            <div className="flex h-3/5 gap-4">
              <div className="flex flex-col w-1/2  gap-4">
                <Box height="2/3" />
                <Box height="1/3">
                  <div className=" dark:bg-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Premium Access
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Unlock all language games and features with a Premium
                      subscription.
                    </p>
                    <div className="w-full flex justify-end">
                      <Button
                        className="border-black text-black hover:bg-black hover:text-white font-bold px-4 rounded-lg transition-colors duration-300"
                        variant="flat"
                      >
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
              <div className="relative h-full ml-0 mr-0 w-1/2 ">
                <span className="absolute top-0 left-0 w-full h-full mt-0.5 ml-0.5 bg-black rounded-lg" />
                <div className="relative h-fit md:h-full p-5 bg-white border-1 border-black rounded-lg">
                  <span className="text-2xl font-bold">Folders</span>
                  <div className="flex flex-wrap w-full gap-4 mt-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-yellow-500/30 rounded-md"
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
// jak bede chcial sie pozbyc obramowania to musze usunac relative z boxa
// <Box height="2/3" />
{
  /* <Box height="1/3" /> */
}

export default Home;
