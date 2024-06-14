import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

import { db } from "../db/config/db";
import { users } from "../schemas/user";
import { sql } from "drizzle-orm";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});

export const logIn = asyncHandler(async (req: Request, res: Response) => {
  throw new Error("Not implemented yet");
});

export const clerkSignUp = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log("Webhook received:", req.body);
    const email = req.body.data.email_addresses[0].email_address;

    const newUser = await db
      .insert(users)
      .values({
        email,
        university_id: "", // default value
        upi: "", // default value
        institution: "Unknown", // default value
        year_of_study: "Unknown", // default value
        study_field: "", // default value
        name: "Unknown", // default value
        is_admin: false,
        is_paid: false,
        is_info_confirmed: false,
        created_at: new Date(),
        membership_expiry: null //@Ratchet7x5 TODO: Handle this during payments process (StripeJS integration)
      })
      .returning({
        user_id: users.user_id,
        email: users.email,
        university_id: users.university_id,
        upi: users.upi,
        institution: users.institution,
        year_of_study: users.year_of_study,
        study_field: users.study_field,
        name: users.name,
        is_admin: users.is_admin,
        is_paid: users.is_paid,
        is_info_confirmed: users.is_info_confirmed,
        created_at: users.created_at,
        membership_expiry: users.membership_expiry
      });

    res.json(newUser[0]);
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});
