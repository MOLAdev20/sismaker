import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../../db/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("admin1234", 10);

  await prisma.user.create({
    data: { id: 1, username: "admin", password: passwordHash },
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
