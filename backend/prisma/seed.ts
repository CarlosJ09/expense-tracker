import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    create: {
      name: "Groceries",
      userId: "a957158c-825d-4318-9306-b7b0ca06a090",
    },
    update: {},
    where: {
      name: "Groceries",
    },
  });
  await prisma.category.upsert({
    create: {
      name: "Rent",
      userId: "a957158c-825d-4318-9306-b7b0ca06a090",
    },
    update: {},
    where: {
      name: "Rent",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
