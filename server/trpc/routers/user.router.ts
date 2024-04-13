import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { SafeParseReturnType } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { hashPassword } from "./../../../utils/functions/password";
import { createUserSchema, type CreateUserInput } from "~/schema/user.schema";

export const userRouter = router({
  signin: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      const createUserSafeParesResult: SafeParseReturnType<CreateUserInput, CreateUserInput> = createUserSchema.safeParse(input);
      if (!createUserSafeParesResult.success) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: createUserSafeParesResult.error.message,
          cause: createUserSafeParesResult.error.cause
        });
      }
      try {
        const hashedPassword = hashPassword(input.password);
        const user = await prisma.user.create({
          data: {
            email: input.email,
            fullName: input.fullName,
            username: input.username,
            password: hashedPassword,
          },
        });
        return user;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Utilisateur déjà existant!",
            });
          }

          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Un problème est survenu lors de votre requête!",
          });
        }
      }
    }),
});
