import { pgTable, serial, text, integer, boolean, timestamp, varchar, time } from "drizzle-orm/pg-core";

// Events Table
export const events = pgTable('events', {
  event_id: serial('event_id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  event_date: timestamp('event_date').notNull(),
  time_start: time('event_time', { withTimezone: false }),
  time_end: time('event_time', { withTimezone: false }),
  tickets_total: integer('tickets_total').notNull(),
  max_tickets_per_user: integer('max_tickets_per_user').default(1),
  is_confirmed: boolean('is_confirmed').default(false),
  created_at: timestamp('created_at').defaultNow(),
  max_tickets_total: integer('max_tickets_total'),
});