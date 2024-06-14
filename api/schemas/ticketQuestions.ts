import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { tickets } from "./tickets";
import { questions } from "./questions";

// Ticket Questions Table
export const ticket_questions = pgTable('ticket_questions', {
  ticket_question_id: serial('ticket_question_id').primaryKey(),
  ticket_id: integer('ticket_id').notNull().references(() => tickets.ticket_id),
  question_id: integer('question_id').notNull().references(() => questions.question_id),
});