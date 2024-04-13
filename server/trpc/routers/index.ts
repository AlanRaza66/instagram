import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { userRouter } from "./user.router";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
        time: new Date()
      };
    }),
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter
