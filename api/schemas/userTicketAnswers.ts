import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { user_ticket } from "./userTicket";
import { answers } from "./answers";

// Information List Table
export const user_ticket_answers = pgTable('user_ticket_answers', {
  information_list_id: serial('information_list_id').primaryKey(),
  user_ticket_id: integer('user_ticket_id').notNull().references(() => user_ticket.user_ticket_id),
  answer_id: integer('answer_id').notNull().references(() => answers.answer_id),
});