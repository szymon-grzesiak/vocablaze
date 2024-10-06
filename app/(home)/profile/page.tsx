import { Button } from "@nextui-org/button";
import { CheckIcon, CrownIcon } from "lucide-react";

import { ExtendedUser } from "@/types/next-auth";
import { createCheckoutSession } from "@/lib/actions/action";
import { currentUser } from "@/lib/sessionData";
import Settings from "@/components/shared/settings";

const SettingsPage = async () => {
  const user = await currentUser();
  const updateUserWithId = createCheckoutSession.bind(null, { userEmail: user?.email as string });

  return (
    <div className="flex flex-wrap gap-6">
     <Settings user={user as ExtendedUser} />
      <div className="bg-gray-900 w-full rounded-md p-6 shadow-lg  dark:bg-gray-50 text-white dark:text-black">
        <div className="flex flex-col items-center justify-center mb-4">
          <CrownIcon className="h-8 w-8 mb-2" />
          <h3 className="text-xl font-bold">Premium Plan</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span>Access to the insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span>Progress tracking</span>
          </div>
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
        </div>
        {user?.role === "USER" ? (
          <>
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
          </> 
        ) : (
          <div className="p-2 border-b flex items-center justify-center mt-4 gap-2">
            You are{" "}
            <span className="font-bold uppercase text-blue-300 text-lg">
              premium
            </span>{" "}
            user
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
