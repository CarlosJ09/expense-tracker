import { getUser, updateUser } from "@/services/user";
import { prismaMock } from "@/tests/mocks/prisma";

test("should get a user", async () => {
  const user = {
    id: "1",
    name: "Rich Haines",
    email: "hello@prisma.io",
    password: "hashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.user.findUnique.mockResolvedValue(user);

  await expect(getUser("1")).resolves.toEqual(
    expect.objectContaining({
      id: "1",
      name: "Rich Haines",
      email: "hello@prisma.io",
      password: "hashedpassword",
    })
  );
});

test("should update a user's name", async () => {
  const oldUser = {
    id: "1",
    name: "Rich Haines",
    email: "hello@prisma.io",
    password: "hashedpassword",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const updatedUser = {
    ...oldUser,
    name: "Carlos",
    updatedAt: new Date(),
  };

  prismaMock.user.update.mockResolvedValue(updatedUser);

  const updateData = { name: "Carlos" };

  await expect(updateUser("1", updateData)).resolves.toEqual(
    expect.objectContaining({
      id: "1",
      name: "Carlos",
      email: "hello@prisma.io",
      password: "hashedpassword",
    })
  );
});
