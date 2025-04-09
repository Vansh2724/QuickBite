import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  restaurantName: string;
};

export const BookDineModal = ({ restaurantName }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    people: 1,
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "people" ? Number(value) : value,
    }));
  };

  const isDateValid = (dateStr: string) => {
    const selected = new Date(dateStr);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2); // 3-day window

    // Set hours to avoid comparing time
    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    maxDate.setHours(0, 0, 0, 0);

    return selected >= today && selected <= maxDate;
  };

  const isTimeValid = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    const isLunch = totalMinutes >= 11 * 60 && totalMinutes <= 14 * 60;
    const isDinner = totalMinutes >= 19 * 60 && totalMinutes <= 23 * 60;

    return isLunch || isDinner;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isDateValid(form.date)) {
      setError("Please select a date within the next 3 days.");
      return;
    }

    if (!isTimeValid(form.time)) {
      setError("Please select a time between 11AM–2PM or 7PM–11PM.");
      return;
    }

    setError(""); // clear any previous error

    console.log("Booking Data:", { restaurantName, ...form });
    alert("Table booked successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow">
          Book a Dine
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Book a Table at {restaurantName}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Booking Date</Label>
            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <small className="text-gray-500">Bookings allowed for today + 2 days only.</small>
          </div>

          <div>
            <Label htmlFor="time">Booking Time</Label>
            <Input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
            />
            <small className="text-gray-500">Available: 11:00–14:00 and 19:00–23:00</small>
          </div>

          <div>
            <Label htmlFor="people">Number of People</Label>
            <Input
              name="people"
              type="number"
              min="1"
              placeholder="e.g. 4"
              value={form.people}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
