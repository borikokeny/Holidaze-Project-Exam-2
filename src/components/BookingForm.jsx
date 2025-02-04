import React, { useState, useEffect } from "react";
import { viewVenue } from "../api/venue";
import { addBooking } from "../api/booking";
import { CountGuests } from "./GuestCounter";
import { DateRange } from "react-date-range";
import ReserveButton from "./ReserveButton";

function BookingForm({ venue }) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

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
            daysArray.push(new Date(startDate).toISOString().split("T")[0]);
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

  const handleSelect = (ranges) => {
    setSelectionRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
  };

  const validateBookingDates = (startDate, endDate) => {
    const selectedDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      selectedDates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return !selectedDates.some((date) => bookedDays.includes(date));
  };

  const handlePrice = () => {
    const dayDifference =
      selectionRange.endDate.getTime() - selectionRange.startDate.getTime();
    const days = Math.ceil(dayDifference / (1000 * 60 * 60 * 24));
    return days * price;
  };

  const bookingFormListener = async () => {
    const preparedData = {
      dateFrom: selectionRange.startDate.toISOString(),
      dateTo: selectionRange.endDate.toISOString(),
      guests: numberOfGuests,
      venueId: venue.id,
    };

    if (
      !validateBookingDates(selectionRange.startDate, selectionRange.endDate)
    ) {
      alert(
        "Your selected dates include unavailable days. Please choose a different range."
      );
      return;
    }

    const totalPrice = handlePrice();
    const confirmation = window.confirm(
      `Please confirm your booking:\n\n` +
        `Check-in: ${new Date(preparedData.dateFrom).toLocaleDateString()}\n` +
        `Check-out: ${new Date(preparedData.dateTo).toLocaleDateString()}\n` +
        `Guests: ${preparedData.guests}\n` +
        `Total Price: ${totalPrice} NOK\n\n` +
        `You're almost there! Continue with this selection?`
    );

    if (!confirmation) {
      alert("Booking cancelled.");
      return;
    }

    try {
      await addBooking(preparedData);
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
        <div className="flex justify-center">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            minDate={new Date()}
            disabledDates={bookedDays.map((date) => new Date(date))}
          />
        </div>
        <label className="block">
          <CountGuests maxGuests={maxGuests} onChange={setNumberOfGuests} />
        </label>

        <ReserveButton onReserve={bookingFormListener} />
      </div>

      <div className="mt-6">
        <p>Check-in Date: {selectionRange.startDate.toLocaleDateString()}</p>
        <p>Check-out Date: {selectionRange.endDate.toLocaleDateString()}</p>
        <p>Guests: {numberOfGuests}</p>
        <p>Total Price: {handlePrice()} NOK</p>
      </div>
    </div>
  );
}

export default BookingForm;
