import { MyResponsiveCalendar } from "@/components/shared/Calendar";
import Settings from "@/components/shared/Settings";
import { RadialChart } from "@/components/shared/Stats";
import { createCheckoutSession } from "@/lib/actions/action";
import {
  get5lastMonthsWordsLearned,
  getDataToCalendar,
} from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { ExtendedUser } from "@/types/next-auth";

import { Button } from "@nextui-org/button";
import { CheckIcon, CrownIcon } from "lucide-react";

const SettingsPage = async () => {
  const user = await currentUser();
  const [calendarData, radialChartData] = await Promise.all([
    getDataToCalendar(),
    get5lastMonthsWordsLearned(user?.id as string),
  ]);

  const updateUserWithId = createCheckoutSession.bind(null, {
    userEmail: user?.email as string,
  });

  return (
    <div className="mx-auto flex w-full flex-wrap gap-6 p-6 lg:w-1/2">
      <Settings user={user as ExtendedUser} />
      {user?.role === "USER" && (
        <section className="w-full rounded-md bg-gray-900 p-6 text-white  shadow-lg dark:bg-slate-900">
          <div className="mb-4 flex flex-col items-center justify-center">
            <CrownIcon className="mb-2 size-8" />
            <h3 className="text-xl font-bold">Premium Plan</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckIcon className="size-5 text-green-500" />
              <span>Unlimited amount of words in the word set (basic user can have up to 30 words per set)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="size-5 text-green-500" />
              <span>Unlimited amount of word sets (basic user can create up to 3 word sets)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="size-5 text-green-500" />
              <span>
                Access to the premium games: <br />- hangman game
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="size-5 text-green-500" />
              <span>Lifetime access to the newest features</span>
            </div>
          </div>
          <form action={updateUserWithId}>
            <Button
              className="mt-4 w-full border-white text-white hover:bg-white hover:text-gray-900 dark:hover:text-black"
              variant="bordered"
              target="_blank"
              type="submit"
            >
              Upgrade Now
            </Button>
          </form>
        </section>
      )}
      <section className="relative block h-[400px] w-full overflow-y-hidden rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:hidden">
        <span className="flex gap-2 text-2xl font-bold">
          <p>📚</p>
          <p>Your learning history</p>
        </span>
        <MyResponsiveCalendar data={calendarData} />
      </section>
      <section className="w-full" id="monthlyTrends">
        <div className="flex h-full flex-col gap-4 rounded-lg bg-black/5 p-5 shadow-md backdrop-blur-xl dark:bg-slate-900/90 lg:hidden">
          <span className="flex gap-2 text-2xl font-bold">
            <p>📈</p> <p>Monthly trends</p>
          </span>
          <div className="size-full rounded-lg dark:bg-gray-800">
            <RadialChart data={radialChartData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
