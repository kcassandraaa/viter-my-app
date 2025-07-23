import React from "react";
import { useState } from "react";
import useQueryData from "../../../../custom-hooks/useQueryData";
import ModalAddHeader from "./ModalAddHeader";
import { FaEdit, FaPlus } from "react-icons/fa";
import { apiVersion } from "../../../../helpers/function-general";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isModalHeader, setIsModalHeader] = React.useState(false);

  const {
    isLoading,
    isFetching,
    error,
    data: dataServices,
  } = useQueryData(
    `${apiVersion}/controllers/developer/web-services/web-services.php`,
    "get",
    "web-services"
  );

  const handleAdd = () => {
    setIsModalHeader(true);
  };

  return (
    <>
      <header id="header" className="bg-white relative shadow-md w-full">
        <div className="container mx-auto px-4 py-7 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            <span className="ml-2 text-xl font-bold">MyApp</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#about" className="hover:text-primary">
              About
            </a>
            <a href="#services" className="hover:text-primary">
              Services
            </a>
            <a href="#contact" className="hover:text-primary">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div className="absolute right-0 top-1/5">
            <div className="flex items-center gap-x-3">
              <button
                className="flex items-center gap-2 hover:underline bg-primary text-white rounded-full p-1 hover:bg-blue-600"
                type="button"
                onClick={handleAdd}
              >
                <FaEdit className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (now positioned absolutely) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg px-4 py-2 space-y-2 border-t border-gray-200">
            <a
              onClick={() => setIsMenuOpen(false)}
              href="#"
              className="block py-2 hover:text-primary"
            >
              Home
            </a>
            <a
              onClick={() => setIsMenuOpen(false)}
              href="#about"
              className="block py-2 hover:text-primary"
            >
              About
            </a>
            <a
              onClick={() => setIsMenuOpen(false)}
              href="#services"
              className="block py-2 hover:text-primary"
            >
              Services
            </a>
            <a
              onClick={() => setIsMenuOpen(false)}
              href="#contact"
              className="block py-2 hover:text-primary"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {isModalHeader && (
        <ModalAddHeader setIsModal={setIsModalHeader}></ModalAddHeader>
      )}
    </>
  );
};
export default Header;
