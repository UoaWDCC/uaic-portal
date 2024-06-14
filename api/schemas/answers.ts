import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

// Answers Table
export const answers = pgTable("answers", {
  answer_id: serial("answer_id").primaryKey(),
  question_id: integer("question_id").notNull(),
  answer: text("answer").notNull(),
});