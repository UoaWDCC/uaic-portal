/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoDataError } from "../classes/NoDataError";
import type {
  Exec,
  Partner,
  SomePhoto,
  Value,
  Introduction,
  PreviousTeam,
  EventGallery,
  PurchasableMembership,
  EventAndTickets,
  TicketAndQuestion,
  PartnerImage,
  EventsSlider,
} from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Mapper {
  static mapToExec(data: any): Exec[] {
    if (!data.execs || data.execs.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.execs.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.data.id,
          name: attributes.Name || "",
          description: attributes.Description || "",
          position: attributes.Position || "",
          role: attributes.Role || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToPartnerImage(data: any): PartnerImage[] {
    if (
      !data.partners ||
      data.partners.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.partners.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";
        return {
          id: item.data.id,
          name: attributes.Name || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToPartner(data: any): Partner[] {
    if (
      !data.partners ||
      data.partners.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.partners.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.data.id,
          type: attributes.Type || "",
          name: attributes.Name || "",
          description: attributes.Description || "",
          location: attributes.Location || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToSomePhotos(data: any): SomePhoto[] {
    if (
      !data.somePhotos ||
      data.somePhotos.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.somePhotos.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";
        console.log(item.data.id)
        return {
          id: item.data.id,
          title: attributes.Title || "",
          year: attributes.Year || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToValue(data: any): Value[] {
    if (!data.values || data.values.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.values.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.data.id,
          title: attributes.Title || "",
          description: attributes.Description || "",
          image: imageUrl,
        };
      });
    }
  }

  static mapToIntroduction(data: any): Introduction[] {
    if (
      !data.introductions ||
      data.introductions.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.introductions.map((item: any) => {
        const attributes = item.data.attributes || {};
        return {
          description: attributes.Description || "",
          events: attributes.Events || "",
          members: attributes.Members || "",
          followers: attributes.Followers || "",
        };
      });
    }
  }

  static mapToPreviousTeams(data: any): PreviousTeam[] {
    if (
      !data.previousTeams ||
      data.previousTeams.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.previousTeams.map((item: any) => {
        const attributes = item.data.attributes || {};
        return {
          id: item.data.id,
          name: attributes.Name || "",
          role: attributes.Role || "",
          year: attributes.Year || "",
        };
      });
    }
  }

  static mapToEventsSlider(data: any): EventsSlider[] {
    if (!data.events || data.events.length === 0) {
      throw new NoDataError("No data");
    } else {
      return data.events.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";
        return {
          id: item.data.documentId,
          title: attributes.Title || "",
          location: attributes.Location || "",
          eventDateStart: attributes.Event_Date_Start || "",
          isLive: attributes.Is_Live || false,
          image: imageUrl,
        };
      });
    }
  }

  static mapToEvent(data: any): EventAndTickets {
    if (!data.event || data.event.length === 0) {
      throw new NoDataError("No data");
    } else {
      console.log(data.event)
      const attributes = data.event.data.attributes || {};
      const imageUrl = attributes.Image?.data?.attributes?.url || "";
      return {
        title: attributes.Title || "",
        description: attributes.Description || "",
        subtitle: attributes.Subtitle || "",
        location: attributes.Location || "",
        eventDateStart: attributes.Event_Date_Start || "",
        eventDateEnd: attributes.Event_Date_End || "",
        termsAndConditions: attributes.Terms_And_Conditions || "",
        eventCapacityRemaining: attributes.Event_Capacity_Remaining || 0,
        isLive: attributes.Is_Live || false,
        image: imageUrl,
        tickets: attributes.Ticket_ID.map((item: any) => {
          const attributesTicket = item.data.attributes || {};
          return {
            id: item.data.documentId,
            name: attributesTicket.Name || "",
            price: attributesTicket.Price || 0,
            isMemberOnly: attributesTicket.Is_Member_Only || false,
            isDouble: attributesTicket.Is_Double || false,
            numTicketsLeft: attributesTicket.Number_Tickets_Left || 0,
            ticketDescription: attributesTicket.Ticket_Description || "",
            startDateTicketSales:
              attributesTicket.Start_Date_Ticket_Sales || "",
            isTicketLive: attributesTicket.Is_Ticket_Live || false,
            ticketLinkBypass: attributesTicket.Ticket_Link_Bypass || false,
            bypassTicketLink: attributesTicket.Bypass_Ticket_Link || "",
            stripeLink: attributesTicket.Stripe_Link || "",
          };
        }),
      };
    }
  }

  static mapToTicketQuestion(data: any): TicketAndQuestion {
    if (!data.ticket || data.ticket.length === 0) {
      throw new NoDataError("No data");
    } else {
      const attributes = data.ticket.data.attributes || {};
      return {
        ticketId: data.ticket.data.id,
        questions: attributes.Question_ID.map((item: any) => {
          const attributesTicket = item.data.attributes || {};
          return {
            id: item.data.id,
            question: attributesTicket.Question || "",
          };
        }),
      };
    }
  }

  static mapToEventsGallery(data: any): EventGallery[] {
    if (
      !data.eventGalleries ||
      data.eventGalleries.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.eventGalleries.map((item: any) => {
        const attributes = item.data.attributes || {};
        const imageUrl = attributes.Image?.data?.attributes?.url || "";

        return {
          id: item.data.id,
          image: imageUrl || "",
        };
      });
    }
  }

  static mapToPurchasableMemberships(data: any): PurchasableMembership[] {
    if (
      !data.purchasableMemberships ||
      data.purchasableMemberships.length === 0
    ) {
      throw new NoDataError("No data");
    } else {
      return data.purchasableMemberships.map((item: any) => {
        const attributes = item.data.attributes || {};
        return {
          id: item.data.id,
          title: attributes.Title,
          expiry: attributes.Expiry,
          price: attributes.Price || 0,
          stripeLink: attributes.Stripe_Link,
          description: attributes.Description,
          membershipLinkBypass: attributes.Membership_Link_Bypass || false,
          bypassMembershipLink: attributes.Bypass_Membership_Link || "",
        };
      });
    }
  }
}
