import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

// Ticket Questions Table
export const ticket_questions = pgTable("ticket_questions", {
  ticket_question_id: serial("ticket_question_id").primaryKey(),
  ticket_id: integer("ticket_id").notNull(),
  question_id: integer("question_id").notNull(),
});