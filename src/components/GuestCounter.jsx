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
    <div className="flex items-center justify-between border p-3 mt-3 rounded-none text-gray-900 ring-1 ring-inset ring-gray-300">
      <span className="text-md font-medium">Number of Guests</span>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={decreseGuests}
          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 rounded-md h-6 w-6 flex items-center justify-center focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
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
          className="w-12 text-center text-gray-900 dark:text-white bg-transparent border-0 text-sm focus:outline-none focus:ring-0"
        />

        <button
          type="button"
          onClick={increseGuests}
          className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 rounded-md h-6 w-6 flex items-center justify-center focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
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
    </div>
  );

  // return (
  //   <div className="relative flex justify-between items-center mb-3 ps-5 w-full border-0 py-1.5 text-nowrap text-gray-900 ring-1 ring-inset ring-gray-300">Number of Guests
  //   <button
  //       type="button"
  //       onClick={decreseGuests}
  //       className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none ms-72"
  //     >
  //       <svg
  //         className="w-2.5 h-2.5 text-gray-900 dark:text-white"
  //         aria-hidden="true"
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="none"
  //         viewBox="0 0 18 2"
  //       >
  //         <path
  //           stroke="currentColor"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth="2"
  //           d="M1 1h16"
  //         />
  //       </svg>
  //     </button>
  //     <input
  //       type="text"
  //       value={countGuest}
  //       readOnly
  //       className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
  //     />
  //     <button
  //       type="button"
  //       onClick={increseGuests}
  //       className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none me-6"
  //     >
  //       <svg
  //         className="w-2.5 h-2.5 text-gray-900 dark:text-white"
  //         aria-hidden="true"
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="none"
  //         viewBox="0 0 18 18"
  //       >
  //         <path
  //           stroke="currentColor"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           strokeWidth="2"
  //           d="M9 1v16M1 9h16"
  //         />
  //       </svg>
  //     </button>
  //   </div>
  // );
}
