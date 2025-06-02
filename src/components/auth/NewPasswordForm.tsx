"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { newPassword } from "@/lib/actions/auth/new-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormError } from "../FormError";
import { FormSuccess } from "../FromSuccess";
import { CardWrapper } from "./CardWrapper";

export const NewPasswordForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter your new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type={isVisible ? "text" : "password"}
                      disabled={isPending}
                      autoCorrect="off"
                      isClearable
                      label="Password"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeOff className="pointer-events-none text-2xl text-default-400" />
                          ) : (
                            <Eye className="pointer-events-none text-2xl text-default-400" />
                          )}
                        </button>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full bg-slate-700 text-white"
            disabled={isPending}
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
