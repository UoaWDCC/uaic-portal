import EventSlider from "./EventSlider";
import PastEventCard from "./PastEventCard";
import { Event } from "../types/types";
import { Link } from "react-router-dom";

interface PastEventsListProps {
  pastEvents: Event[];
}

const PastEventsList: React.FC<PastEventsListProps> = ({ pastEvents }) => {
  return (
    <EventSlider cardType="past">
      {pastEvents.map((event, index) => (
        <div key={index} className="p-2 hover:cursor-pointer">
          <Link to={`/events/${event.id}`} state={{ event }}>
            <PastEventCard pastEvent={event} />
          </Link>
        </div>
      ))}
    </EventSlider>
  );
};

export default PastEventsList;
