import { integer, varchar, boolean, timestamp, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  user_id: serial('user_id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  university_id: varchar('university_id', { length: 50 }),
  upi: varchar('upi', { length: 50 }),
  institution: varchar('institution', { length: 50 }),
  year_of_study: varchar('year_of_study', { length: 50 }),
  study_field: varchar('study_field', { length: 255 }),
  is_admin: boolean('is_admin').default(false),
  is_paid: boolean('is_paid').default(false),
  is_info_confirmed: boolean('is_info_confirmed').default(false),
  created_at: timestamp('created_at').defaultNow(),
  membership_expiry: timestamp('membership_expiry'),
});