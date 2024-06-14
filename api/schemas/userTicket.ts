import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

// UserTicket Table
export const user_ticket = pgTable("user_ticket", {
  user_ticket_id: serial("user_ticket_id").primaryKey(),
  user_id: integer("user_id").notNull(),
  ticket_id: integer("ticket_id").notNull(),
  ticket_number: integer("ticket_number"),
});