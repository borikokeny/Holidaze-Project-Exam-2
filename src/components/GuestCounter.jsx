import React, { useState } from "react";

export function CountGuests({ maxGuests, onChange }) {
  const [countGuest, setCountGuest] = useState(1);

  const decreseGuests = () => {
    if (countGuest > 1) {
      const newCount = countGuest - 1;
      setCountGuest(newCount);
      onChange(newCount);
    }
  };

  const increseGuests = () => {
    if (countGuest < maxGuests) {
      const newCount = countGuest + 1;
      setCountGuest(newCount);
      onChange(newCount);
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={decreseGuests}
        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-2.5 h-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        value={countGuest}
        readOnly
        className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
      />
      <button
        type="button"
        onClick={increseGuests}
        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-2.5 h-2.5 text-gray-900 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}
