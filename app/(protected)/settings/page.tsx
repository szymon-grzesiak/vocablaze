"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { SettingsSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { settings } from "@/lib/actions/settings"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

const SettingsPage = () => {
  const user = useCurrentUser()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

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
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Something went wrong!"))
    })
  }

  return (
    <>
      <div className="relative top-0 left-0 w-[100px] h-[50px] bg-blue-300 rounded-xl">
        <div className="flex items-center justify-center w-full h-full">
          <Link href={"/vault"} className="font-bold ">
            Vault
          </Link>
        </div>
      </div>
      <Card>
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              placeholder="john.doe@example.com"
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
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              placeholder="•••••••••"
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
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              placeholder="•••••••••"
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
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
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
    </>
  )
}

export default SettingsPage
