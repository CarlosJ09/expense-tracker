import { updateUser } from "@/services/user";
import { prismaMock } from "@/tests/mocks/prisma";

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
    name: "James Peterson",
    updatedAt: new Date(),
  };

  prismaMock.user.update.mockResolvedValue(updatedUser);

  const updateData = { name: "Carlos" };

  await expect(updateUser("1", updateData)).resolves.toEqual(
    expect.objectContaining({
      id: "1",
      name: "James Peterson",
      email: "hello@prisma.io",
      password: "hashedpassword",
    })
  );
});
