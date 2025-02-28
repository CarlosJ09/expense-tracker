import { User } from "@prisma/client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Partial<User>;
}
