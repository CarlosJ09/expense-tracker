import { getUser, getUsers, updateUser, deleteUser } from "@/services/user";
import { prismaMock } from "@/tests/mocks/prisma";

const users = [
  {
    id: "1",
    name: "Rich Haines",
    email: "hello@prisma.io",
    password: "hashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Carlos",
    email: "carlos@prisma.io",
    password: "hashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const testingUser = users[0];

describe("User Service", () => {
  test("should get all users", async () => {
    prismaMock.user.findMany.mockResolvedValue(users);

    await expect(getUsers()).resolves.toEqual(expect.arrayContaining(users));
  });

  test("should get a user", async () => {
    prismaMock.user.findUnique.mockResolvedValue(testingUser);

    await expect(getUser("1")).resolves.toEqual(expect.objectContaining(testingUser));
  });

  test("should update a user's name", async () => {
    const updatedUser = {
      ...testingUser,
      name: "Carlos",
    };

    prismaMock.user.update.mockResolvedValue(updatedUser);

    const updateData = { name: "Carlos" };

    await expect(updateUser("1", updateData)).resolves.toEqual(
      expect.objectContaining(updatedUser)
    );
  });

  test("should delete a user", async () => {
    prismaMock.user.delete.mockResolvedValue(testingUser);

    await expect(deleteUser("1")).resolves.toEqual(expect.objectContaining(testingUser));
  });
});
