import { gql } from "@apollo/client";

export const GET_EXECS = gql`
  query {
    execs {
      data {
        id
        attributes {
          Name
          Description
          Position
          Role
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PARTNERS = gql`
  query {
    partners {
      data {
        id
        attributes {
          Type
          Name
          Location
          Description
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PARTNER_IMAGES = gql`
  query {
    partners {
      data {
        id
        attributes {
          Name
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_INTRODUCTION = gql`
  query {
    introductions {
      data {
        attributes {
          Description
          Events
          Members
          Followers
        }
      }
    }
  }
`;

export const GET_SOME_PHOTOS = gql`
  query {
    somePhotos {
      data {
        id
        attributes {
          Title
          Year
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_VALUES = gql`
  query {
    values {
      data {
        documentId
        attributes {
          Title
          Description
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PREVIOUS_TEAMS = gql`
  query {
    previousTeams {
      data {
        id
        attributes {
          Name
          Role
          Year
        }
      }
    }
  }
`;

export const GET_EVENTS_SLIDER = gql`
  query {
    events {
      data {
        documentId
        attributes {
          Title
          Location
          Event_Date_Start
          Is_Live
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_EVENTS_GALLERY = gql`
  query {
    eventGalleries {
      data {
        id
        attributes {
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PURCHASEABLE_MEMBERSHIPS = gql`
  query {
    purchasableMemberships {
      data {
        id
        attributes {
          Title
          Expiry
          Price
          Stripe_Link
          Description
          Membership_Link_Bypass
          Bypass_Membership_Link
        }
      }
    }
  }
`;

export function getEventById({ id }: { id: string }) {
  return gql`
  query {
    event(documentId:"${id}") {
      data {
        id
        attributes {
          Title
          Description
          Subtitle
          Location
          Event_Date_Start
          Event_Date_End
          Is_Live
          Terms_And_Conditions
          Event_Capacity_Remaining
          Image {
            data {
              attributes {
                url
              }
            }
          }
          Ticket_ID{
            data{
              documentId
              attributes{
                Name
                Price
                Is_Member_Only
                Is_Double
                Number_Tickets_Left
                Ticket_Description
                Start_Date_Ticket_Sales
                Is_Ticket_Live
                Ticket_Link_Bypass
                Bypass_Ticket_Link
                Stripe_Link
              }
            }
          }
        }
      }
    }
}
  
`;
}

export function getTicketQuestions({ id }: { id: string }) {
  return gql`
    query {
      ticket(documentId:"${id}") {
        data {
          id
          attributes {
            Question_ID {
              data {
                id
                attributes {
                  Question
                }
              }
            }
          }
        }
      }
    }
  `;
}
