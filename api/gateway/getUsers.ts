import { db } from "../db/config/db";
import { User } from "../types/types";
import { users } from "../schemas/user";

export async function getUsers() {
  return (await db.select().from(users)) as User[];
}
