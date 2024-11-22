import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.PRO, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(1, {
        message: "The current password is needed to reset the password",
      })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(8, {
          message: "Password must be at least 8 characters",
        })
        .regex(new RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,32}"), {
          message:
            "Password must contain one uppercase letter and one lowercase letter",
        })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(new RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,32}"), {
      message:
        "Password must contain one uppercase letter and one lowercase letter",
    }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(
    z
      .string()
      .min(1, { message: "Code is required" })
      .max(6, { message: "Code cannot be longer than six characters" })
  ),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(new RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,32}"), {
      message:
        "Password must contain one uppercase letter and one lowercase letter",
    }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const AddWordSetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  firstLanguageId: z.string().min(1, "First language is required"),
  secondLanguageId: z.string().min(1, "Second language is required"),
  folders: z.array(z.string()).optional(),
  words: z
    .array(
      z.object({
        originalWord: z.string().min(1, "Original word is required"),
        translatedWord: z.string().min(1, "Translated word is required"),
        id: z.string().optional(),
      })
    )
    .min(5, "You must provide at least 5 word.")
    .max(30, "You can provide at most 30 words"),
});

export const AddFolderSchema = z.object({
  name: z.string().min(1, "Folder name is required"),
  color: z.string().nullable(),
});

export const UpdateWordSetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  firstLanguageId: z.string().min(1, "First language is required"),
  secondLanguageId: z.string().min(1, "Second language is required"),
  folderId: z.string().min(1, "Folder is required"),
  words: z
    .array(
      z.object({
        original_word: z.string().min(1, "Original word is required"),
        translated_word: z.string().min(1, "Translated word is required"),
      })
    )
    .min(5, "You must provide at least 5 word.")
    .max(30, "You can provide at most 30 words"),
});
