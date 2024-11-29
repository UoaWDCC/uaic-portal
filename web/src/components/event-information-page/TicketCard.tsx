import { useNavigate } from "react-router";
import { ContinueWithPasswordlessTheme } from "supertokens-auth-react/lib/build/recipe/passwordless/components/themes/continueWithPasswordless";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface LocationInformationProps {
  title: string;
  isDouble: boolean;
  price: number;
  stripeLink: string;
  bypass: boolean;
  bypassLink: string;
  isTicketLive: boolean;
  numTicketsLeft: number;
  isMemberOnly: boolean;
}

export default function TicketCard({
  title,
  isDouble,
  price,
  stripeLink,
  bypass,
  bypassLink,
  isTicketLive,
  numTicketsLeft,
  isMemberOnly,
}: LocationInformationProps) {
  const navigate = useNavigate();
  const session = useSessionContext();

  function handleOnClick() {
    console.log(bypass);
    if (bypass) {
      window.open(bypassLink, "_blank");
    } else {
      if (!session.loading) {
        if (true && session.doesSessionExist) {
          navigate("/checkout", {
            state: { data: { priceId: stripeLink, isTicket: true } },
          });
        } else {
          navigate("/membership");
        }
      } else {
        navigate("/checkout", {
          state: { data: { priceId: stripeLink, isTicket: true } },
        });
      }
    }
  }

  const isTicketOnSale = isTicketLive && numTicketsLeft > 0;

  return (
    <>
      {" "}
      <div className="flex items-center justify-center pt-6">
        <div className="mx-2 flex w-[80rem] items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
          <div>
            <p className="pl-4 text-xl font-bold">{title}</p>
            {isDouble ? (
              <p className="pl-4 text-xs text-gray-500">
                Both ticket holders must be members
              </p>
            ) : isMemberOnly ? (
              <p className="pl-4 text-xs text-gray-500">
                You must be a paid member to purchase this ticket
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-center">
            <p className="text-xl font-bold">${price.toFixed(2)}</p>
            <button
              disabled={!isTicketOnSale}
              onClick={handleOnClick}
              className={` ${!isTicketOnSale ? "text-md mx-4 cursor-not-allowed rounded-lg bg-gray-300 px-5 py-3 font-bold text-black" : "bg-primary-orange text-md mx-4 rounded-lg px-5 py-3 font-bold text-white transition-all hover:scale-105"} `}
            >
              {!isTicketOnSale ? "Sold out" : "Get Tickets"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
