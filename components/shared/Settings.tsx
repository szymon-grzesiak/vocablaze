"use client";

import { useState, useTransition } from "react";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ExtendedUser } from "@/types/next-auth";
import { settings } from "@/lib/actions/auth/settings";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FromSuccess";

const Settings = ({ user }: { user: ExtendedUser }) => {
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

  console.log("useeer", user)

  const moreFields = user?.isOAuth === false || user?.isLinked === true;

  return (
    <section className="flex w-full">
      <Card className="flex w-full flex-col justify-between border-none shadow-lg">
        <CardHeader>
          <p className="text-center text-2xl font-semibold">⚙️ Settings</p>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
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
                {moreFields && (
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
                              disabled={true}
                              isDisabled={true}
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="on"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"                    
                              label="Password"
                              disabled={isPending}
                              autoComplete="off"
                              autoCorrect="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                isDisabled={!form.formState.isDirty || isPending}
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
    </section>
  );
};

export default Settings;
