// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.cycle.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      {
        username: "alice",
        password: "password123",
        why: "왜냐하면 창의적이기 때문이에요.",
      },
      {
        username: "bob",
        password: "securepassword",
        why: "사이클링을 사랑해서요.",
      },
      {
        username: "charlie",
        password: "charliepwd",
        why: "자기계발을 위해서입니다.",
      },
    ],
  });
  console.log(`${users.count} users created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
