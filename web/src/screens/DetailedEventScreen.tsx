import Header from "@components/Header";
import React from "react";
import { useLocation } from "react-router-dom";

const DetailedEventScreen = () => {
  const location = useLocation();
  const event = location.state?.event; // Accessing passed event data

  if (!event) {
    return <div>Event not found</div>; // Fallback if no data is passed
  }

  return (
    <div className="h-auto">
      <div className="max-w-screen h-auto bg-white">
        <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-auto bg-gradient-to-b">
          <Header />
          <div className="flex h-auto w-full flex-row items-center justify-center bg-red-500 bg-transparent pb-10">
            <div className="flex w-11/12 flex-col lg:w-3/4">
              <div>
                <img src={event.image} width={100} alt="" />
              </div>
              <div>
                <h1>{event.title}</h1>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedEventScreen;
