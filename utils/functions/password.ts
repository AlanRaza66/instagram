import { hashSync } from "bcrypt";

export const hashPassword = (password: string): string => {
  const passwordSaltRounds = 10;
  return hashSync(password, passwordSaltRounds);
};
