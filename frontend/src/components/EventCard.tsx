type EventCardProps = {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
};

function EventCard({ title, date, location, imageUrl }: EventCardProps) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-1">{date}</p>
        <p className="text-sm text-gray-600">{location}</p>
        <button className="mt-4 text-stone-900 font-medium py-2 px-5 bg-yellow-300 hover:bg-yellow-400 rounded">
          View Details
        </button>
      </div>
    </div>
  );
}

export default EventCard;
