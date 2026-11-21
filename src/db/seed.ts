import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('DATABASE_URL loaded:', !!process.env.DATABASE_URL);

import { getDb } from './index';
import { users } from './schema/auth';
import bcrypt from 'bcryptjs';

async function seed() {
  const db = getDb();

  const email = 'parham@example.com';
  const password = 'ChangeMe123!';

  const existing = await db.select().from(users).limit(1);
  if (existing.length > 0) {
    console.log('User already exists, skipping seed.');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    id: crypto.randomUUID(),
    email,
    name: 'Parham Batouie',
    passwordHash,
  });

  console.log('✅ Admin created successfully:');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
  console.log('   ⚠️  Change this password after first login!');
  process.exit(0);
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});