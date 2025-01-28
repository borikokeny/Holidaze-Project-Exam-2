import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="font-main bg-gray-100 shadow-md mt-10 pb-6">
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-600">
            &copy; Bori Kokeny 2025
          </div>
          <ul className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Partners
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-4 text-gray-600">
            <a href="#" className="hover:text-gray-900">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-900">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
