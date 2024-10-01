// testCreateCycle.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createCycle = async (userId) => {
  const newCycle = await prisma.cycle.create({
    data: {
      reflection: "사이클을 만들었어요.",
      medium: "사이클",
      user: { connect: { id: userId } },
    },
  });
  return newCycle;
};

const removeCycle = async (cycleId) => {
  await prisma.cycle.delete({
    where: { id: cycleId },
  });
};

const recycle = async (userId, cycleId) => {
  const recycled = await prisma.cycle.create({
    data: {
      reflection: `리사이클은 즐거워요. ${userId}`,
      medium: `리사이클ed from ${cycleId}`,
      userId: userId,
      recycledFromId: cycleId,
      recycledByUserId: userId,
    },
    select: {
      id: true,
    },
  });
  return recycled;
};

const upcycle = async (userId, cycleId) => {
  const upcycled = await prisma.cycle.create({
    data: {
      reflection: `업사이클은 즐거워요. ${userId}`,
      medium: `업사이클ed from ${cycleId}`,
      userId: userId,
      upcycledFromId: cycleId,
      upcycledByUserId: userId,
    },
  });
  return upcycled;
};

async function testRecycle() {
  const alice = await prisma.user.findUnique({
    where: { username: "alice" },
    select: { id: true },
  });
  const bob = await prisma.user.findUnique({
    where: { username: "bob" },
    select: { id: true },
  });
  const charlie = await prisma.user.findUnique({
    where: { username: "charlie" },
    select: { id: true },
  });

  // Alice creates a cycle
  const cycle = await createCycle(alice.id);
  // Bob wants to recycle Alice's cycle
  const recycledByBob = await recycle(bob.id, cycle.id);
  // Charlie also wants to recycle Alice's cycle
  const recycledByCharlie = await recycle(charlie.id, cycle.id);
  // Remove the cycle
  await removeCycle(cycle.id);
  // // Alice creates a new cycle
  await createCycle(alice.id);

  await prisma.$disconnect();
}
// testRecycle();

async function testUpcycle() {
  const alice = await prisma.user.findUnique({
    where: { username: "alice" },
    select: { id: true },
  });

  const cycle = await createCycle(alice.id);
  const upcycled1 = await upcycle(alice.id, cycle.id);
  const upcycled2 = await upcycle(alice.id, upcycled1.id);
  const upcycled3 = await upcycle(alice.id, upcycled2.id);

  await removeCycle(upcycled2.id);

  await prisma.$disconnect();
}

testUpcycle();
