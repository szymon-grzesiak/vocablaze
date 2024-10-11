import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import { get5lastMonthsWordsLearned, getAllWordSets, getDataToCalendar, getFolders } from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { cn } from "@/lib/utils";
import { WordSet } from "@/hooks/useWordProgress";
import DeleteButton from "@/components/ui/delete-button";
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
  const currUser = await currentUser();
  const [wordSetsResponse, folders, calendarData, radialChartData] = await Promise.all([
    getAllWordSets(),
    getFolders(),
    getDataToCalendar(),
    get5lastMonthsWordsLearned(currUser?.id as string),
  ]);

  const { wordSets, error } = wordSetsResponse;
  const user = await currentUser();

  console.log("radialChartData", radialChartData);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 p-4 h-full">
      <div className="flex flex-col lg:w-1/3 gap-4 h-full" id="left-panel">
        <section className={cn("flex flex-col h-3/4 rounded-lg bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md", user?.role === 'PRO' && 'h-full')}>
          <span className="flex justify-between p-5">
            <span className="flex gap-2 text-2xl font-bold">
              <p>🌍</p>
              <p>Latest learning</p>
            </span>
            <Search queryKey="sets" />
          </span>
          {(wordSets as any)?.length > 0 ? (
            <WordSetsList wordSets={wordSets} error={error as string} />
          ) : (
            <div className="h-full w-1/2 mx-auto flex flex-col gap-6 justify-center items-center">
              <QuestionMarkCircledIcon className="w-8 h-8 text-indigo-500" />
              <p>
                Oh, it looks like you don&apos;t have any word sets yet, go
                ahead and create one.
              </p>
              <Link href={"/add"} className="w-full flex justify-start">
                <Button className="w-full">Create word set</Button>
              </Link>
            </div>
          )}
        </section>
        {user?.role === "USER" && (
          <section className="hidden h-1/4 lg:flex lg:justify-between lg:gap-3 lg:flex-col p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg dark:bg-gray-700">
            <span className="flex gap-2 text-2xl font-bold">
              <p>💲</p> <p>Premium Access</p>
            </span>
            <p className="text-gray-600 dark:text-gray-400">
              Unlock all language games and features with a Premium
              subscription.
            </p>
              <Button
                className="font-bold p-4 rounded-lg"
                variant="flat"
                color="success"
              >
                <Link href={"/profile"}> Upgrade to Premium</Link>
              </Button>
          </section>
        )}
      </div>
      <div className="flex flex-col lg:w-2/3 gap-4" id="right-panel">
        <section className="hidden lg:block relative h-full max-h-[300px] w-full bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md p-5 rounded-lg">
          <span className="flex gap-2 text-2xl font-bold">
            <p>📚</p> <p>Your learning history</p>
          </span>
          <MyResponsiveCalendar data={calendarData} />
        </section>
        <section
          className="flex flex-col lg:flex-row gap-4 h-full"
          id="monthlyTrends + folders"
        >
          <div className="w-full lg:w-1/3 h-full" id="monthlyTrends">
            <div className="hidden h-full lg:flex flex-col p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
              <span className="flex gap-2 text-2xl font-bold">
                <p>📈</p> <p>Monthly trends</p>
              </span>
              <div className="dark:bg-gray-800 rounded-lg w-full h-full">
                <RadialChart wordSets={wordSets} data={radialChartData}/>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 h-full" id="folders">
            <div className="flex flex-col h-full gap-4 p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
              <span className="flex justify-between">
                <span className="flex gap-2 text-2xl font-bold">
                  <p>📁</p> <p>Folders</p>
                </span>
                <Search queryKey="folders" />
              </span>
              {folders.length > 0 ? (
                <FoldersList
                  folders={folders}
                  searchParams={searchParams}
                  wordSets={wordSets as any}
                />
              ) : (
                <div className="h-full w-1/2 mx-auto flex flex-col gap-3 justify-center items-center">
                  <QuestionMarkCircledIcon className="w-8 h-8 text-indigo-500" />
                  <p>
                    Oh, it looks like you don&apos;t have any folders yet, go
                    ahead and create one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
