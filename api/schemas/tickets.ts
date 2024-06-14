import { pgTable, serial, text, integer, boolean, timestamp, numeric, varchar } from "drizzle-orm/pg-core";
import { events } from "./events";

// Tickets Table
export const tickets = pgTable('tickets', {
  ticket_id: serial('ticket_id').primaryKey(),
  event_id: integer('event_id').notNull().references(() => events.event_id),
  discount_code: varchar('discount_code', { length: 255 }),
  discount_price: numeric('discount_price'),
  price: numeric('price').notNull(),
  is_member_only: boolean('is_member_only').default(false),
  max_num_tickets: integer('max_num_tickets'),
  num_tickets_left: integer('num_tickets_left'),
  ticket_description: text('ticket_description'),
  ticket_name: varchar('ticket_name', { length: 255 }),
  start_date_ticket_sales: timestamp('start_date_ticket_sales'),
  end_date_ticket_sales: timestamp('end_date_ticket_sales'),
});