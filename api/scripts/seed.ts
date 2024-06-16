import { users } from "../schemas/user";
import events from "../db/sampleEvents";
import { tickets } from "../schemas/tickets";

import { db } from "../db/config/db";

const main = async () => {
  try {
    console.log("Seeding database");
    // Delete all data
    await db.delete(users);

    //insert fake data
    await db.insert(users).values([
      {
        name: "Harsheel Singh",
        email: "hsin212@aucklanduni.ac.nz",
        year_of_study: "4",
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
        year_of_study: "4",
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
      // Keep Naren's data barebones (for testing reasons)
      {
        name: null,
        email: "nroh555@aucklanduni.ac.nz",
        year_of_study: null,
        university_id: null,
        upi: null,
        institution: null,
        study_field: null,
        is_admin: true,
        is_paid: true,
        is_info_confirmed: false,
        created_at: new Date(),
        membership_expiry: null,
      },
    ]);
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();


/*
// Add some fake Events data
{
  title: "Club Expo"
  description: "Club expo, come and join our stall and try your luck at some games, we have give aways for the first ten people to sign up everyday!"
  location: "Outside Old Governmnet House, inside the tent"
  event_date: "2/4/24"
  event_time: "10:00am"
  tickets_total: -1
  max_tickets_per_user: -1
  created_at: "1/4/24"
  max_tickets_total: -1
},
{
  title: "Dance Series: Shawn Thomas"
  description: "Shawn Thomas Presents AUIS Dance workshop. We have the amazing Shawn Thomas here to provide a great dance workshop on the song something, and we have limited tickets so get them quickly"
  location: "Vivo dance studio 4"
  event_date: "2/5/24"
  event_time: "7:00pm"
  tickets_total: 20
  max_tickets_per_user: 1
  created_at: "1/5/24"
  max_tickets_total: 1
},
{
  title: "Dance Series: Bhangra with Gury and Jasreet"
  description: "AUIS presents Bhangra workshop, come along and learn how to do Bhangra. This workshop is meant for beginers too don't worry if you have never done bhangra before"
  location: "Vivo dance studio 4"
  event_date: "6/5/24"
  event_time: "7:00pm"
  tickets_total: 20
  max_tickets_per_user: 1
  created_at: "5/5/24"
  max_tickets_total: 1
},
{
  title: "Pub Quiz"
  description: "Join us for our first ever Pub Quiz, where you get to join a team of 10 and take part to test your knowledge on triva about inda. We will cover all general knowledge on India"
  location: "Shadow Bar"
  event_date: "2/6/24"
  event_time: "7:00pm"
  tickets_total: 50
  max_tickets_per_user: 4
  created_at: "1/5/24"
  max_tickets_total: 50
}
*/