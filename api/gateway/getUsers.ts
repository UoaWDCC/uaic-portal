import { users } from "../schemas/user";
import { db } from "../db/config/db";
import { User } from "../types/types";

export async function getUsers() {
  return (await db.select().from(users)) as User[];
}
