import { sign, verify } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const generateToken = (payload: any) => {
  if (!JWT_SECRET) return;

  const token = sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token: string) => {
  const user = verify(token, "secret");
  return user;
};

export { generateToken, verifyToken };
