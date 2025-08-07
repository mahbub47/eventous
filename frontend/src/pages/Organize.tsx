import api from "@/utils/api";
import { useEffect, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

type Event = {
  _id: string;
  eventTitle: string;
  eventSubtitle?: string;
  eventDate: string;
  eventStartTime?: string;
  eventEndTime?: string;
  eventLocation: string;
  eventPrice: string;
  eventDescription: string;
  eventCoverImage?: string;
  createdBy?: string;
};

function Organize() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/api/events/my-events");
        setMyEvents(response.data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      }
    };
    fetchMyEvents();
  });

  return (
    <div className="min-h-screen">
      <div className="w-8/12 mx-auto mt-20">
        <h1 className="text-3xl font-medium mb-4">Events</h1>
        <div className="flex flex-col gap-4">
          {myEvents.map((event) => {
            const formattedDate = event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                })
              : "Date not available";
            const formattedMonth = event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-GB", {
                  month: "short",
                })
              : "Date not available";
            const formattedDATE = event?.eventDate
              ? new Date(event.eventDate).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date not available";
            return (
              <div className="w-full p-5 bg-stone-100 flex" key={event._id}>
                <div className="flex-1 flex">
                  <div className="flex flex-col justify-center items-center text-center mx-5">
                    <div className="font-normal text-lg text-red-500">
                      {formattedMonth}
                    </div>
                    <div className="font-normal text-md">{formattedDate}</div>
                  </div>
                  <div className="mx-5 flex flex-col justfy--between">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {event.eventTitle}
                      </h2>
                      <h4 className="text-md">{event.eventLocation}</h4>
                    </div>
                    <div className="text-xs">{formattedDATE}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="text-sm">Ticket sold</div>
                    <div>0</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm">Gross</div>
                    <div>0</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-sm mb-1">Status</div>
                    <div className="bg-green-200 px-4 rounded text-sm py-1">Upcoming</div>
                  </div>
                  <div>
                    <GoKebabHorizontal className="h-5 w-5 mr-5 cursor-pointer" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Organize;
