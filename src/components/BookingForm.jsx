import React, { useState } from "react";
import { viewVenue } from "../api/venue";
import { addBooking } from "../api/booking";
import { CountGuests } from "./GuestCounter";
import DatePicker from "react-datepicker";
import ReserveButton from "./ReserveButton";

function BookingForm({ venue }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [error, setError] = useState("");

  const { price, maxGuests } = venue;

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
    <div>
      <div className="flex flex-row mb-3">
        <p className="text-xl text-stone-600 me-6">
          {price} NOK <span className="font-normal"> / night</span>
        </p>
        <p className="text-xl text-stone-600">Max guests: {maxGuests} person</p>
      </div>
      <div className="w-2/3">
        <form>
          <div className="flex justify-stretch">
            <label>
              Check in
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select date"
                className="ms-2 ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
              />
            </label>
            <label className="ms-10">
              Check out
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select date"
                className="ms-2 ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
              />
            </label>
          </div>

          <label>
            Number of guests
            <CountGuests maxGuests={maxGuests} onChange={handleGuests} />
          </label>
        </form>
        <ReserveButton onReserve={bookingFormListener} />
      </div>
      <div className="mt-3">
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
