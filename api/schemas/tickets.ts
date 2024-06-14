import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

// Tickets Table
export const tickets = pgTable("tickets", {
  ticket_id: serial("ticket_id").primaryKey(),
  event_id: integer("event_id").notNull(),
  discount_code: text("discount_code"),
  discount_price: numeric('discount_price', {scale: 2}),
  price: numeric('price', {scale: 2}),
  is_member_only: boolean("is_member_only").default(false),
  max_num_tickets: integer("max_num_tickets"),
  num_tickets_left: integer("num_tickets_left"),
  ticket_description: text("ticket_description"),
  ticket_name: text("ticket_name"),
  start_date_ticket_sales: timestamp("start_date_ticket_sales"),
  end_date_ticket_sales: timestamp("end_date_ticket_sales"),
});