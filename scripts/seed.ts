const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Music" },
        { name: "Photography" },
        { name: "Fitness" },
        { name: "Engineering" },
        { name: "Filming" },
        { name: "Technology" },
        { name: "Computer Science" },
        { name: "Sales" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error sending the database category", error);
  } finally {
    await database.$disconnect();
  }
}

main();
