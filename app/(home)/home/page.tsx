import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { getAllWordSets, getDataToCalendar, getFolders } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { MyResponsiveCalendar } from "@/components/shared/calendar";
import Search from "@/components/shared/search";
import { RadialChart } from "@/components/shared/stats";

import FoldersList from "../../../components/shared/folder-list";
import WordSetsList from "../../../components/shared/wordset-list";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const [wordSetsResponse, folders, calendarData] = await Promise.all([
    getAllWordSets(),
    getFolders(),
    getDataToCalendar(),
  ]);

  const { wordSets, error } = wordSetsResponse;
  const user = await currentUser();

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row w-full gap-4">
      <div className="flex flex-col lg:w-1/3 gap-4">
        <section className="h-full rounded-lg bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md">
          <span className="flex justify-between p-5">
            <span className="flex gap-2 text-2xl font-bold">
              <p>🌍</p>
              <p>Latest learning</p>
            </span>
            <Search queryKey="sets" />
          </span>
          <WordSetsList wordSets={wordSets} error={error as string} />
        </section>
        {user?.role === "USER" && (
          <section className="hidden lg:block relative p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg dark:bg-gray-700">
            <span className="flex gap-2 text-2xl font-bold">
              <p>💲</p> <p>Premium Access</p>
            </span>
            <p className="text-gray-600 dark:text-gray-400">
              Unlock all language games and features with a Premium
              subscription.
            </p>
            <div className="w-full flex justify-end">
              <Button
                className="border-black hover:bg-black hover:text-white font-bold px-4 rounded-lg transition-colors duration-300 mt-3"
                variant="flat"
              >
                <Link href={"/profile"}> Upgrade to Premium</Link>
              </Button>
            </div>
          </section>
        )}
      </div>
      <div className="flex flex-col lg:w-2/3 gap-4">
        <section className="hidden lg:block relative h-full max-h-[350px] w-full bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md p-5 rounded-lg">
          <span className="flex gap-2 text-2xl font-bold">
            <p>📚</p> <p>Your learning history</p>
          </span>
          <MyResponsiveCalendar data={calendarData} />
        </section>
        <section className="flex flex-col lg:flex-row gap-4 h-full ">
          <div className="relative h-full w-full lg:w-1/3 gap-4 ">
            <div className="hidden lg:flex justify-around flex-col p-5 h-full bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
              <span className="flex gap-2 text-2xl font-bold">
                <p>📈</p> <p>Monthly trends</p>
              </span>
              <div className="dark:bg-gray-800 rounded-lg w-full">
                <RadialChart wordSets={wordSets} />
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-2/3">
            <div className="flex flex-col gap-4 h-full p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
              <span className="flex justify-between">
                <span className="flex gap-2 text-2xl font-bold">
                  <p>📁</p> <p>Folders</p>
                </span>
                <Search queryKey="folders" />
              </span>
              <FoldersList folders={folders} searchParams={searchParams} wordSets={wordSets as any}/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
