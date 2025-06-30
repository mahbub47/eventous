import LoadingPage from "@/pages/LoadingPage";
import api from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";

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

interface EventContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events");
      setEvents(res.data.events);
    } catch (error) {
      console.log("Errors occur while fetching events", error);
    }
  }

  useEffect(() => {
    fetchEvents();
  },[]);


  const value = {
    events,
    setEvents,
    isLoading,
    setIsLoading,
  };

  if (isLoading) return <LoadingPage />;

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEventContext must be used within an EventContextProvider");
  return context;
};
