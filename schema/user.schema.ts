import { z } from "../utils/zod";
import { userConfig } from "~/utils/configs/user.config";

export const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z
    .string()
    .min(userConfig.NAME_MIN_LENGTH)
    .max(userConfig.NAME_MAX_LENGTH),
  username: z
    .string()
    .min(userConfig.USERNAME_MIN_LENGTH)
    .max(userConfig.USERNAME_MAX_LENGTH),
  password: z.string().min(userConfig.PASSWORD_MIN_LENGTH),
});

export const createUserOutputSchema = z.object({
  email: z.string().email(),
  fullName: z
    .string()
    .min(userConfig.NAME_MIN_LENGTH)
    .max(userConfig.NAME_MAX_LENGTH),
  username: z
    .string()
    .min(userConfig.USERNAME_MIN_LENGTH)
    .max(userConfig.USERNAME_MAX_LENGTH),
  password: z.string().min(userConfig.PASSWORD_MIN_LENGTH),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
