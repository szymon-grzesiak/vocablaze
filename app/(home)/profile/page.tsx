import { Button } from "@nextui-org/button";
import { CheckIcon, CrownIcon } from "lucide-react";

import { ExtendedUser } from "@/types/next-auth";
import { createCheckoutSession } from "@/lib/actions/action";
import {
  get5lastMonthsWordsLearned,
  getAllWordSets,
  getDataToCalendar,
} from "@/lib/data/rest";
import { currentUser } from "@/lib/sessionData";
import { MyCalendar, MyResponsiveCalendar } from "@/components/shared/Calendar";
import Settings from "@/components/shared/settings";
import { RadialChart } from "@/components/shared/stats";
import { Calendar } from "@nivo/calendar";

const SettingsPage = async () => {
  const user = await currentUser();
  const [wordSetsResponse, calendarData, radialChartData] = await Promise.all([
    getAllWordSets(),
    getDataToCalendar(),
    get5lastMonthsWordsLearned(user?.id as string),
  ]);

  const updateUserWithId = createCheckoutSession.bind(null, {
    userEmail: user?.email as string,
  });

  return (
    <div className="flex flex-wrap gap-6 w-full lg:w-1/2 mx-auto p-6">
      <Settings user={user as ExtendedUser} />
      {user?.role === "USER" && (
        <section className="bg-gray-900 w-full rounded-md p-6 shadow-lg  dark:bg-slate-900 text-white">
          <div className="flex flex-col items-center justify-center mb-4">
            <CrownIcon className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-bold">Premium Plan</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Unlimited amount of words in the word set</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>
                Access to the premium games: <br />- hangman game
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Lifetime access to the newest features</span>
            </div>
          </div>
          <form action={updateUserWithId}>
            <Button
              className="w-full mt-4 text-white border-white hover:bg-white hover:text-gray-900 dark:hover:text-gray-50"
              variant="bordered"
              target="_blank"
              type="submit"
            >
              Upgrade Now
            </Button>
          </form>
        </section>
      )}
      <section className="block lg:hidden w-full h-[400px] relative bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md p-5 rounded-lg overflow-y-hidden">
        <span className="flex gap-2 text-2xl font-bold">
          <p>📚</p>
          <p>Your learning history</p>
        </span>
          <MyResponsiveCalendar data={calendarData} />
      </section>
      <section className="w-full" id="monthlyTrends">
        <div className="flex h-full lg:hidden flex-col gap-4 p-5 bg-black/5 dark:bg-slate-900/90 backdrop-blur-xl shadow-md rounded-lg">
          <span className="flex gap-2 text-2xl font-bold">
            <p>📈</p> <p>Monthly trends</p>
          </span>
          <div className="dark:bg-gray-800 rounded-lg w-full h-full">
            <RadialChart data={radialChartData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
