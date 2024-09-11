import React from "react";
import { useLocation } from "react-router-dom";

const DetailedEventScreen = () => {
  const location = useLocation();
  const event = location.state?.event; // Accessing passed event data

  if (!event) {
    return <div>Event not found</div>; // Fallback if no data is passed
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <img src={event.image} alt="" />
      {/* Add more details here */}
      {/* Example: <img src={event.imageUrl} alt={event.title} /> */}
    </div>
  );
};

export default DetailedEventScreen;
