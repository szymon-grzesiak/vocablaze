"use client";

import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { register } from "@/lib/actions/auth/register";
import { RegisterSchema } from "@/schemas";

import { FormError } from "../FormError";
import { FormSuccess } from "../FromSuccess";
import { CardWrapper } from "./CardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import Image from "next/image";
import book from "@/assets/images/book.jpg"

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <div className="flex h-[650px]">
    <Image src={book} className="hidden lg:block lg:w-[300px] h-auto rounded-l-xl shadow object-cover" alt="A book"/>
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={true}
      className="rounded-l-[0px] flex-grow"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      autoComplete="off"
                      type="name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      autoComplete="off"
                      label="E-mail"
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
                      type={isVisible ? "text" : "password"}
                      autoComplete="off"
                      label="Password"
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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
    </div>
  );
};
