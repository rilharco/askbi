import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'rilharco@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'secret123';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { name: 'Admin', passwordHash, role: 'admin', onboardingComplete: true },
    create: { email, name: 'Admin', passwordHash, role: 'admin', onboardingComplete: true }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
