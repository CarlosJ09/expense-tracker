import { loginUserService } from "@/services/auth";
import { prismaMock } from "@/tests/mocks/prisma";
import { comparePasswords } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";

jest.mock("@/utils/bcrypt", () => ({
  comparePasswords: jest.fn(),
}));

jest.mock("@/utils/jwt", () => ({
  generateToken: jest.fn(),
}));

describe("Auth Service", () => {
  const testingUser = {
    id: "1",
    name: "Rich Haines",
    email: "hello@prisma.io",
    password: "hashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockToken = "fake.jwt.token";

  beforeEach(() => {
    jest.clearAllMocks();
    (comparePasswords as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue(mockToken);
  });

  test("should login a user successfully", async () => {
    const loginPayload = {
      email: testingUser.email,
      password: "password123",
    };

    prismaMock.user.findUnique.mockResolvedValue(testingUser);

    const result = await loginUserService(loginPayload);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: loginPayload.email },
    });

    expect(comparePasswords).toHaveBeenCalledWith(loginPayload.password, testingUser.password);

    expect(generateToken).toHaveBeenCalledWith({ id: testingUser.id });

    expect(result).toMatchObject({
      token: mockToken,
      user: {
        id: testingUser.id,
        email: testingUser.email,
        name: testingUser.name,
      },
    });
  });
});
