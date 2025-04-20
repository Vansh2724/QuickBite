type Props = {
    booking: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      date: string;
      time: string;
      people: number;
    };
  };
  
  const BookingItemCard = ({ booking }: Props) => {
    return (
      <div className="border p-4 rounded-lg shadow-sm bg-white">
        <h3 className="text-lg font-semibold">{booking.name}</h3>
        <p>Email: {booking.email}</p>
        <p>Phone: {booking.phone}</p>
        <p>
          Date: {booking.date} | Time: {booking.time}
        </p>
        <p>People: {booking.people}</p>
      </div>
    );
  };
  
  export default BookingItemCard;
  