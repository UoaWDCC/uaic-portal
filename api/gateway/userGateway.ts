import { peoples, purchasableMemberships } from "../schemas/schema";
import { db } from "../db/config/db";
import { User, UpdateUserInfoBody } from "../types/types";
import { eq } from "drizzle-orm";
import { stripe } from "../stripe/stripe";

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

  try {
    //since this is for memberships, get the current user by their email id
    let customer = await db
      .select()
      .from(peoples)
      .where(eq(peoples.email, checkoutSession.customer_details!.email!))
      .limit(1);

    //then, retrieve the price id from metadata from purchaseableMemberships
    let expiryDate = await db
      .select()
      .from(purchasableMemberships)
      .where(
        eq(
          purchasableMemberships.stripeLink,
          checkoutSession.metadata!["priceId"]
        )
      )
      .limit(1);

    // then, apply the retrieved expiry date into the users' field
    let updateExpiryDate = await db
      .update(peoples)
      .set({ memberExpiryDate: expiryDate[0].expiry })
      .where(eq(peoples.email, checkoutSession.customer_details!.email!))
      .returning({ expiryDate: peoples.memberExpiryDate });
  } catch (error) {
    throw new Error(
      "Unknown error occurred while trying to update user membership: " + error
    );
  }
}

export async function insertUserBySuperToken(
  data: UpdateUserInfoBody
): Promise<User[]> {
  /*const userExists = await doesUserExistByEmail(email);

  if (userExists) {
    throw new Error(`User with email ${email} already exists.`);
  }*/

  console.log(
    "Status and institution for user info sign up is not inserted into peoples database table"
  );
  console.log("insertUserBySuperToken: received: ", data);

  const newUser = (await db
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

  return newUser;
}

export async function doesUserExistByEmail(email: string): Promise<boolean> {
  const user = await db.query.peoples.findFirst({
    columns: { id: true },
    where: eq(peoples.email, email),
  });

  return user !== undefined && user !== null;
}
