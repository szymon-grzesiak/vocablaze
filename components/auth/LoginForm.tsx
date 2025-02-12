"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import book from "@/public/assets/images/book.jpg";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { login } from "@/lib/actions/auth/login";
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
import { Button as SButon } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { CardWrapper } from "./CardWrapper";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl!)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });

    form.reset;
  };
  // devtools 1347px szerokości
  return (
    <div className="flex h-[650px]">
      <Image
        src={book}
        className="hidden lg:block lg:w-[300px] h-auto rounded-l-xl shadow object-cover"
        alt="A book"
      />
      <CardWrapper
        headerLabel="Dive in."
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
        className="rounded-l-[0px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            label="E-mail"
                            type="email"
                            autoCorrect="off"
                            autoComplete="off"
                            isClearable
                            disabled={isPending}
                            {...field}
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
                            {...field}
                            label="Password"
                            type={isVisible ? "text" : "password"}
                            autoCorrect="off"
                            disabled={isPending}
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
                        <SButon variant="link" size="sm" className="px-0">
                          <Link href="/auth/reset">Forgot password?</Link>
                        </SButon>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            {showTwoFactor ? (
              <div className="flex gap-3">
                <Button
                  variant="shadow"
                  type="button"
                  onClick={() => {
                    setShowTwoFactor(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="shadow"
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-slate-700 text-white"
                >
                  {showTwoFactor ? "Confirm" : "Log In"}
                </Button>
              </div>
            ) : (
              <Button
                variant="shadow"
                type="submit"
                disabled={isPending}
                className="w-full bg-slate-700 text-white"
              >
                {showTwoFactor ? "Confirm" : "Log In"}
              </Button>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
