import { MyResponsiveCalendar } from "@/components/shared/Calendar";
import Search from "@/components/shared/Search";
import { RadialChart } from "../../../components/shared/Stats";
import {
  get5lastMonthsWordsLearned,
  getAllWordSets,
  getDataToCalendar,
  getFolders,
} from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { cn } from "@/lib/utils";

import FoldersList from "@/components/shared/FolderList";
import WordSetsList from "@/components/shared/WordSetList";
import { Button } from "@nextui-org/button";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const currUser = await currentUser();
  const [wordSetsResponse, folders, calendarData, radialChartData] =
    await Promise.all([
      getAllWordSets(),
      getFolders(),
      getDataToCalendar(),
      get5lastMonthsWordsLearned(currUser?.id as string),
    ]);

  const { wordSets, error } = wordSetsResponse;
  const user = await currentUser();

  return (
    <div className="flex size-full flex-col gap-4 p-4 lg:flex-row">
      <div className="flex h-full flex-col gap-4 lg:w-1/3" id="left-panel">
        <section
          className={cn(
            "flex flex-col h-3/4 rounded-lg bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md",
            user?.role === "PRO" && "h-full"
          )}
        >
          <span className="flex justify-between p-5">
            <span className="flex gap-2 text-2xl font-bold">
              <p>🌍</p>
              <p>Latest learning</p>
            </span>
            <Search queryKey="sets" />
          </span>
          {(wordSets as any)?.length > 0 ? (
            <WordSetsList wordSets={wordSets} searchParams={searchParams} error={error as string} />
          ) : (
            <div className="mx-auto flex h-full w-1/2 flex-col items-center justify-center gap-6">
              <QuestionMarkCircledIcon className="size-8 text-indigo-500" />
              <p>
                Oh, it looks like you don&apos;t have any word sets yet, go
                ahead and create one.
              </p>
              <Link href={"/add"} className="flex w-full justify-start">
                <Button className="w-full">Create word set</Button>
              </Link>
            </div>
          )}
        </section>
        {user?.role === "USER" && (
          <section className="hidden h-1/4 rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:flex lg:flex-col lg:justify-between lg:gap-3">
            <span className="flex gap-2 text-2xl font-bold">
              <p>💲</p> <p>Premium Access</p>
            </span>
            <p className="text-gray-600 dark:text-gray-400">
              Unlock all language games and features with a Premium
              subscription.
            </p>
            <Button
              className="rounded-lg p-4 font-bold"
              variant="flat"
              color="success"
            >
              <Link href={"/profile"}> Upgrade to Premium</Link>
            </Button>
          </section>
        )}
      </div>
      <div className="flex flex-col gap-4 lg:w-2/3" id="right-panel">
        <section className="relative hidden size-full max-h-[300px] rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:block">
          <span className="flex gap-2 text-2xl font-bold">
            <p>📚</p> <p>Your learning history</p>
          </span>
          <MyResponsiveCalendar data={calendarData} />
        </section>
        <section
          className="flex h-full flex-col gap-4 lg:flex-row"
          id="monthlyTrends + folders"
        >
          <div className="size-full lg:w-1/3" id="monthlyTrends">
            <div className="hidden h-full flex-col gap-4 rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:flex">
              <span className="flex gap-2 text-2xl font-bold">
                <p>📈</p> <p>Monthly trends</p>
              </span>
              <div className="size-full rounded-lg dark:bg-gray-800">
                <RadialChart data={radialChartData} />
              </div>
            </div>
          </div>
          <div className="size-full lg:w-2/3" id="folders">
            <div className="flex h-full flex-col gap-4 rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90">
              <span className="flex justify-between gap-4">
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
                <div className="mx-auto flex h-full w-1/2 flex-col items-center justify-center gap-3">
                  <QuestionMarkCircledIcon className="size-8 text-indigo-500" />
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
