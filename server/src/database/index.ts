import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { playersTable } from './schema';
  
const db = drizzle(process.env.DB_URL!);

async function main() {
  const player: typeof playersTable.$inferInsert = {
    name: 'John',
    genderMatch: 'F',
  };

  const [newPlayer] = await db.insert(playersTable).values(player).returning();
  console.log('New player created: ', newPlayer);

  const players = await db.select().from(playersTable);
  console.log('Getting all players from the database: ', players)
  /*
  const players: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(playersTable)
    .set({
      genderMatch: 'O',
    })
    .where(eq(playersTable.id, newPlayer.id));
  console.log('player info updated!')

  await db.delete(playersTable).where(eq(playersTable.id, newPlayer.id));
  console.log('player deleted!')
}

main();
