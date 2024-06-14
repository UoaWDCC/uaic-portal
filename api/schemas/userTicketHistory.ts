import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

// User Ticket History Table
export const user_ticket_history = pgTable("user_ticket_history", {
  user_ticket_id: serial("user_ticket_id").primaryKey(),
  user_id: integer("user_id").notNull(),
  ticket_id: integer("ticket_id").notNull(),
});