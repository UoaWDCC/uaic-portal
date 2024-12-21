import {
  answers,
  answersPeopleTicketLinks,
  answersQuestionIdLinks,
  peoples,
  purchasableMemberships,
  questions,
  userTickets,
  userTicketsPeopleIdLinks,
  userTicketsTicketIdLinks,
} from "../schemas/schema";
import { db } from "../db/config/db";
import { User, UpdateUserInfoBody } from "../types/types";
import { eq } from "drizzle-orm";
import { stripe } from "../stripe/stripe";
import { getUserEmail, getUserIdByEmail } from "./authGateway";
import { updateUserMetadata } from "supertokens-node/recipe/usermetadata";

export async function getUserMembershipExpiryDate(
  userEmail: string
): Promise<string> {
  let returnDate = "";

  if (userEmail === "" || userEmail === undefined || userEmail === null) {
    throw new Error(
      "getUserMembershipExpiryDate: received invalid type for userEmail: " +
        userEmail
    );
  }

  let membershipExpiryDate = await db
    .select({ memberExpiryDate: peoples.memberExpiryDate })
    .from(peoples)
    .where(eq(peoples.email, userEmail))
    .limit(1);

  if (membershipExpiryDate.length == 1) {
    if (
      membershipExpiryDate[0].memberExpiryDate === undefined ||
      membershipExpiryDate[0].memberExpiryDate === null
    ) {
    } else if (
      membershipExpiryDate[0].memberExpiryDate !== undefined ||
      membershipExpiryDate[0].memberExpiryDate !== null
    ) {
      returnDate = membershipExpiryDate[0].memberExpiryDate;
    }
  } else if (membershipExpiryDate.length === 0) {
    throw new Error(
      "getUserMembershipExpiryDate: membershipExpiryDate.length was 0"
    );
  }

  return returnDate;
}

export async function isMembershipActive(userEmail: string): Promise<boolean> {
  let isActive = false;

  if (userEmail === "" || userEmail === undefined || userEmail === null) {
    throw new Error(
      "isMembershipActive: received invalid type for userEmail: " + userEmail
    );
  }

  let isMember = await db
    .select({ isMember: peoples.isMember })
    .from(peoples)
    .where(eq(peoples.email, userEmail))
    .limit(1);

  if (isMember.length === 1) {
    if (isMember[0].isMember !== undefined || isMember[0].isMember !== null) {
      isActive = isMember[0].isMember!;
    }
  }

  return isActive;
}

/**
 * Inserts an unpaid ticket into the userTickets (People_Ticket) table
 * @param data The payload containing name, email, phoneNumber, answers (q&a). ticketId isn't currently used.
 * @returns
 */
export async function insertUserTicket(data: {
  ticketId: number;
  name: string;
  email: string;
  phoneNumber: string;
  answers: {
    questionId: number;
    answer: string;
  }[];
}): Promise<{ userTicketId: number }> {
  // return the userTicketId
  let newUserTicket: { userTicketId: number }[];

  newUserTicket = await db
    .insert(userTickets)
    .values({
      // ticketId: data.ticketId,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      paid: false,
    })
    .returning({ userTicketId: userTickets.id });

  //figure out how to add People_ID link to userTickets
  //find people id by getting the email? but it will fail if the user isn't a member
  // todo: I think this query fails if there is no one with that email in the db, and probs adding a catch would fix the issue
  // let people = await db
  //   .select()
  //   .from(peoples)
  //   .where(eq(peoples.email, data.email))
  //   .limit(1);

  // const userTicketIdLink = await db
  //   .insert(userTicketsTicketIdLinks)
  //   .values({
  //     userTicketId: newUserTicket[0].userTicketId,
  //     ticketId: data.ticketId,
  //   })
  //   .returning();

  // console.log("insertUserTicket: userTicketIdLink: " + userTicketIdLink[0]);

  const ticketId = newUserTicket[0].userTicketId;

  console.dir("insertUserTicket: ticketId: " + ticketId);

  if (data.answers.length > 0) {
    const answerRecords = data.answers.map((answerData) => ({
      ticketId: ticketId,
      questionId: answerData.questionId,
      answer: answerData.answer,
    }));

    console.log(
      "insertUserTicket: answerRecords: " +
        JSON.stringify(answerRecords, null, 2)
    );

    for (let index = 0; index < data.answers.length; index++) {
      let answer = await db
        .insert(answers)
        .values(answerRecords[index])
        .returning();

      let answerQuestionIdLink = await db
        .insert(answersQuestionIdLinks)
        .values({
          questionId: answerRecords[index].questionId,
          answerId: answer[0].id,
        })
        .returning();

      let answersPeopleTicketLink = await db
        .insert(answersPeopleTicketLinks)
        .values({
          userTicketId: answerRecords[index].ticketId,
          answerId: answer[0].id,
        })
        .returning();

      console.log(
        "insertUserTicket: answer: " + JSON.stringify(answer, null, 2)
      );
      console.log(
        "insertUserTicket: answerQuestionIdLink: " +
          JSON.stringify(answerQuestionIdLink, null, 2)
      );
      console.log(
        "insertUserTicket: answersPeopleTicketLink: " +
          JSON.stringify(answersPeopleTicketLink, null, 2)
      );
    }
  }

  //error occurs here
  console.log(
    "insertUserTicket: userTicketsPeopleIdLink: ticketId: ",
    data.ticketId
  );

  // let userTicketsPeopleIdLink = await db
  //   .insert(userTicketsPeopleIdLinks)
  //   .values({
  //     peopleId: people[0].id,
  //     userTicketId: ticketId,
  //   })
  //   .returning()
  //   .catch((error) => {
  //     console.log(
  //       "insertUserTicket: userTicketsPeopleIdLink: error occurred: ",
  //       error
  //     );
  //   });

  // console.log(
  //   "insertUserTicket: userTicketsPeopleIdLink: " + userTicketsPeopleIdLink![0]!
  // );

  //for question: link the answer.id to this question. More of an admin type task.
  //let question = await db.update(questions).set().where(eq(questions.id, data.answers[0].questionId));
  //for answer: question.id needs to be linked. People_ticket, if logged in, link it to this user to the one purchasing the ticket.

  return newUserTicket[0];
}

export async function updateUserMembershipExpiryDate(
  sessionId: string
): Promise<void> {
  if (sessionId === "" || sessionId === undefined || sessionId === null) {
    throw new Error(
      "updateUserMembershipExpiryDate: received invalid type for sessionId: " +
        sessionId
    );
  }

  //retrieve stripe session
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  // try {
  //   //since this is for memberships, get the current user by their email id
  //   let customer = await db
  //     .select()
  //     .from(peoples)
  //     .where(eq(peoples.email, checkoutSession.customer_details!.email!))
  //     .limit(1);

  //   console.log("updateUserMembershipExpiryDate: customer: " + customer);

  //   //then, retrieve the price id from metadata from purchaseableMemberships
  //   let expiryDate = await db
  //     .select()
  //     .from(purchasableMemberships)
  //     .where(
  //       eq(
  //         purchasableMemberships.stripeLink,
  //         checkoutSession.metadata!["priceId"]
  //       )
  //     )
  //     .limit(1);

  //   console.log("updateUserMembershipExpiryDate: expiryDate: " + expiryDate);

  //   // then, apply the retrieved expiry date into the users' field
  //   let updateExpiryDate = await db
  //     .update(peoples)
  //     .set({ memberExpiryDate: expiryDate[0].expiry, isMember: true })
  //     .where(eq(peoples.email, checkoutSession.customer_details!.email!))
  //     .returning({ memberExpiryDate: peoples.memberExpiryDate });

  //   console.log(
  //     "updateUserMembershipExpiryDate: updateExpiryDate: " + updateExpiryDate
  //   );

  //   //update user metadata
  //   //getUserIdByEmail
  //   let customerEmail = await getUserEmail(
  //     checkoutSession.customer_details!.email!
  //   );

  //   let userId = await getUserIdByEmail(customerEmail);

  //   await updateUserMetadata(userId, {
  //     bIsMembershipPaymentComplete: true,
  //   });
  // } catch (error) {
  //   throw new Error(
  //     "Unknown error occurred while trying to update user membership: " + error
  //   );
  // }
}

export async function insertUserBySuperToken(
  data: UpdateUserInfoBody
): Promise<User[]> {
  let updateUserInfoOrNewUser: User[];
  //if user exists in peoples table already, then update the info
  const userExists = await doesUserExistByEmail(data.email);

  if (userExists) {
    updateUserInfoOrNewUser = (await db
      .update(peoples)
      .set({
        email: data.email,
        name: data.name,
        universityId: data.universityId,
        upi: data.upi,
        yearOfStudy: data.yearOfStudy,
        studyField: data.fieldOfStudy,
        status: data.isDomestic,
        institution: data.institution,
      })
      .where(eq(peoples.email, data.email))
      .returning()) as User[];
  } else {
    updateUserInfoOrNewUser = (await db
      .insert(peoples)
      .values({
        email: data.email,
        createdAt: new Date().toISOString(),
        name: data.name,
        universityId: data.universityId,
        upi: data.upi,
        yearOfStudy: data.yearOfStudy,
        studyField: data.fieldOfStudy,
        isMember: false,
        status: data.isDomestic,
        institution: data.institution,
      })
      .returning()) as User[];
  }

  return updateUserInfoOrNewUser;
}

export async function doesUserExistByEmail(email: string): Promise<boolean> {
  const user = await db.query.peoples.findFirst({
    columns: { id: true },
    where: eq(peoples.email, email),
  });

  return user !== undefined && user !== null;
}
