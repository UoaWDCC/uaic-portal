import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

// Questions Table
export const questions = pgTable("questions", {
  question_id: serial("question_id").primaryKey(),
  question: text("question").notNull(),
});