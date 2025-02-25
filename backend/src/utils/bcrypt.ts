import { hash, compare } from "bcryptjs";

const encryptPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  const isPasswordValid = await compare(password, hashedPassword);
  return isPasswordValid;
};
 
export { encryptPassword, comparePasswords };
