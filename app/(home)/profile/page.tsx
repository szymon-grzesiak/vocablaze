"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { UserRole } from "@prisma/client";
import { CheckIcon, CrownIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { settings } from "@/lib/actions/auth/settings";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const SettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: `${user?.name}` || undefined,
      email: `${user?.email}` || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="flex">
      <div className="bg-gray-900 rounded-l-lg p-6 shadow-lg text-white dark:bg-gray-50">
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
        <Button
          className="w-full mt-4 text-white border-white hover:bg-white hover:text-gray-900 dark:hover:text-gray-50"
          variant="bordered"
        >
          <Link target="_blank" href={`https://buy.stripe.com/test_14kaIg9tI5PxayYbII` + '?prefilled_email=' + user?.email}>
          Upgrade Now
          </Link>
        </Button>
      </div>
      <Card className="rounded-r-lg rounded-l-none shadow-lg border-none flex flex-col justify-between ">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          label="Name"
                          disabled={isPending}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="on"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              label="E-mail"
                              disabled={isPending}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="on"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              label="Password"
                              disabled={isPending}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="on"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              label="New Password"
                              disabled={isPending}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="on"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          label="Select a role"
                          className="max-w-xs"
                          defaultSelectedKeys={[field.value]}
                        >
                          <SelectItem
                            key={UserRole.ADMIN}
                            value={UserRole.ADMIN}
                          >
                            Admin
                          </SelectItem>
                          <SelectItem key={UserRole.USER} value={UserRole.USER}>
                            User
                          </SelectItem>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Two Factor Authentication</FormLabel>
                            <FormDescription>
                              Enable 2FA for your Account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                className="w-full"
                size="lg"
                type="submit"
              >
                
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
