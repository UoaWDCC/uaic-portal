import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { users } from "./user";
import { tickets } from "./tickets";

// UserTicket Table
export const user_ticket = pgTable('user_ticket', {
  user_ticket_id: serial('user_ticket_id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => users.user_id),
  ticket_id: integer('ticket_id').notNull().references(() => tickets.ticket_id),
  ticket_number: integer('ticket_number'),
});