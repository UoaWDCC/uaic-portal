import { users } from "../schemas/user";
import { db } from "../db/config/db";

const main = async () => {
  try {
    console.log("Seeding database");
    // Delete all data
    await db.delete(users);
    await db.insert(users).values([
      {
        name: "Harsheel Singh",
        email: "hsin212@aucklanduni.ac.nz",
        year_of_study: 4,
        university_id: "12345",
        upi: "hsin212",
        institution: "UoA",
        study_field: "SOFTENG",
        is_admin: true,
        is_paid: true,
        is_info_confirmed: true,
        created_at: new Date(),
        membership_expiry: null,
      },
      {
        name: "Guryash Matharu",
        email: "gmat222@aucklanduni.ac.nz",
        year_of_study: 4,
        university_id: "23456",
        upi: "gmat222",
        institution: "UoGOAT",
        study_field: "SOFTENG",
        is_admin: true,
        is_paid: true,
        is_info_confirmed: false,
        created_at: new Date(),
        membership_expiry: null,
      },
      {
        name: "Naren Rohan",
        email: "nroh555@aucklanduni.ac.nz",
        year_of_study: 4,
        university_id: "",
        upi: "",
        institution: "",
        study_field: "SOFTENG",
        is_admin: true,
        is_paid: true,
        is_info_confirmed: false,
        created_at: new Date(),
        membership_expiry: null,
      }
    ]);
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
