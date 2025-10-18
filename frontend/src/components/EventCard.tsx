import { useEventContext } from "@/context/EventContext";
import api from "@/utils/api";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  totalTickets?: string;
  totalSoldTickets?: string;
};

function EventCard({
  id,
  title,
  date,
  location,
  imageUrl,
  totalTickets,
  totalSoldTickets,
}: EventCardProps) {
  const { savedEventIds, setSavedEventIds } = useEventContext();

  const isSaved = savedEventIds.includes(id);

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${id}`);
  };

  const toggleSave = async () => {
    const save = !isSaved;

    const res = api.post(`/api/events/${id}/save`, { save });
    toast.success((await res).data.message);

    if (save) {
      setSavedEventIds((prev) => [...prev, id]);
    } else {
      setSavedEventIds((prev) => prev.filter((eventId) => eventId !== id));
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
      <div className="cursor-pointer" onClick={handleViewDetails}>
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        {totalTickets === totalSoldTickets && (
          <div className="bg-yellow-300 absolute right-0 p-2 top-0 rounded">
            SOLD OUT
          </div>
        )}
        <div className="p-5 mb-15">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-600 mb-1">{date}</p>
          <p className="text-sm text-gray-600">{location}</p>
          <button
            onClick={handleViewDetails}
            className="mt-4 text-stone-900 font-medium cursor-pointer absolute bottom-5 left-5 bg-yellow-300 py-2 px-3 rounded hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
      <button
        className="absolute bottom-7 right-5 cursor-pointer"
        onClick={toggleSave}
      >
        {isSaved ? (
          <FaBookmark className="w-5 h-5" />
        ) : (
          <FaRegBookmark className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default EventCard;
