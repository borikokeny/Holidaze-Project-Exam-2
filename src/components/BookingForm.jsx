import React, { useState, useEffect } from "react";
import { viewVenue } from "../api/venue";
import { addBooking } from "../api/booking";
import { CountGuests } from "./GuestCounter";
import DatePicker from "react-datepicker";
import ReserveButton from "./ReserveButton";

function BookingForm({ venue }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [bookedDays, setBookedDays] = useState([]);
  const [error, setError] = useState("");

  const { price, maxGuests } = venue;

  useEffect(() => {
    const fetchBookedDays = async () => {
      try {
        const venueId = await viewVenue(venue.id);
        const bookingsOnVenue = venueId.bookings || [];

        const days = bookingsOnVenue.flatMap((booking) => {
          const startDate = new Date(booking.dateFrom);
          const endDate = new Date(booking.dateTo);
          const daysArray = [];
          while (startDate <= endDate) {
            daysArray.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
          }
          return daysArray;
        });
        setBookedDays(days);
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };
    fetchBookedDays();
  }, [venue.id]);

  const handleGuests = (count) => {
    setNumberOfGuests(count);
  };

  const handlePrice = () => {
    if (!startDate || !endDate) {
      return 0;
    }
    const dayDifference = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(dayDifference / (1000 * 60 * 60 * 24));
    return days * price;
  };

  const bookingFormListener = async () => {
    const preparedData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: numberOfGuests,
      venueId: venue.id,
    };

    try {
      await addBooking(preparedData);
      console.log("Booking successful with data:", preparedData);
      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking venue:", error);
      alert("Failed to book the venue.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xl text-stone-600">
            {price} NOK <span className="font-normal"> / night</span>
          </p>
          <p className="text-xl text-stone-600">
            Max guests: {maxGuests} person
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col text-sm md:text-base">
              Check in
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select date"
                className="ps-2 mt-2 block w-full rounded-none border border-gray-300 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm md:text-base"
                excludeDates={bookedDays}
                minDate={new Date()}
              />
            </label>
            <label className="flex flex-col text-sm md:text-base">
              Check out
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select date"
                className="ps-2 mt-2 block w-full rounded-none border border-gray-300 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-sm md:text-base"
                excludeDates={bookedDays}
                minDate={startDate || new Date()}
              />
            </label>
          </div>
          <label className="block">
            <CountGuests maxGuests={maxGuests} onChange={handleGuests} />
          </label>
        </form>
        <ReserveButton onReserve={bookingFormListener} />
      </div>
      <div className="mt-6">
        <p>
          Check-in Date:{" "}
          {startDate ? startDate.toLocaleDateString() : "Not selected"}
        </p>
        <p>
          Check-out Date:{" "}
          {endDate ? endDate.toLocaleDateString() : "Not selected"}
        </p>
        <p>Guests: {numberOfGuests}</p>
        <p>Total Price: {handlePrice()} NOK</p>
      </div>
    </div>
  );
}

export default BookingForm;
