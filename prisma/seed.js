const prisma = require("../prisma");

const seed = async () => {
  const createPlayers = async () => {
    const players = [
      { name: "Terry", breed: "Chihuahua", status: "FIELD" },
      { name: "Jingles", breed: "Terrier", status: "FIELD" },
      { name: "Harold", breed: "Bloodhound" },
      { name: "Miguel", breed: "Pitbull", status: "BENCH" },
      { name: "Helen", breed: "Dachsund" },
      { name: "Fritz", breed: "Chihuahua", status: "FIELD" },
      { name: "Pretzel", breed: "Labrador", status: "FIELD" },
      { name: "Schnitzel", breed: "Mutt" },
      { name: "Rico", breed: "Pug", status: "BENCH" },
      { name: "Sanchez", breed: "Jack Russell" },
    ];
    await prisma.player.createMany({ data: players });
  };
  await createPlayers();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
