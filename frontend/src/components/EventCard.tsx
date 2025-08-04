import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
};

function EventCard({ id, title, date, location, imageUrl }: EventCardProps) {

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${id}`);
  };
  
  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5 mb-15">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">{date}</p>
        <p className="text-sm text-gray-600">{location}</p>
        <button onClick={handleViewDetails} className="mt-4 text-stone-900 font-medium cursor-pointer absolute bottom-5 left-5 bg-yellow-300 py-2 px-3 rounded">
          View Details
        </button>
        <button className="absolute bottom-7 right-5 cursor-pointer"><FaRegBookmark className="w-5 h-5"/></button>
      </div>
    </div>
  );
}

export default EventCard;
