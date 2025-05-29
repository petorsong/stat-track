import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), // TODO: switch to UUID?
  name: varchar({ length: 255 }).notNull(),
  genderMatch: varchar({ length: 255 }).notNull(),
});
