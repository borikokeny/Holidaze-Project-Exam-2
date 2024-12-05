import React from "react";

const VenueForm = () => {
  return (
    <div className="flex justify-center border-2 w-3/5">
    <form className="flex mt-3 mb-3 pe-8">
      <div className="border rounded-md p-6 bg-gray-100">
        <p>fnføklsjklgsæl</p>
        <input
          type="email"
          placeholder="Email"
          required
          className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
        />
        <input
          type="Password"
          placeholder="Password"
          required
          className="ps-2 block w-full rounded-none mb-2 border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:shadow-xl sm:text-sm sm:leading-6"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-64 mt-2 rounded-none bg-sky-500 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60"
          >
            Publish this Venue
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default VenueForm;
