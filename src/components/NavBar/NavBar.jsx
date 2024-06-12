import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    setUser(null);
    navigate("/");
  };

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <nav className="w-64 bg-transparent text-black p-6 pt-12 flex flex-col">
      <Link to="/profile">
        <button
          className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
            activeButton === "profile" ? "bg-ac6031 text-white" : ""
          }`}
          onClick={() => handleClick("profile")}
        >
          Profile
        </button>
      </Link>
      {user.type === "owner" && (
        <>
          <Link to="/appointments">
            <button
              className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
                activeButton === "appointments" ? "bg-ac6031 text-white" : ""
              }`}
              onClick={() => handleClick("appointments")}
            >
              Appointments
            </button>
          </Link>
          <Link to="/addappt">
            <button
              className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
                activeButton === "addappt" ? "bg-ac6031 text-white" : ""
              }`}
              onClick={() => handleClick("addappt")}
            >
              Add Appointment
            </button>
          </Link>
          <Link to="/search">
            <button
              className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
                activeButton === "search" ? "bg-ac6031 text-white" : ""
              }`}
              onClick={() => handleClick("search")}
            >
              Search
            </button>
          </Link>
          <Link to="/archive">
            <button
              className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
                activeButton === "archive" ? "bg-ac6031 text-white" : ""
              }`}
              onClick={() => handleClick("archive")}
            >
              Archives
            </button>
          </Link>
          <Link to="/map">
            <button
              className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
                activeButton === "archive" ? "bg-ac6031 text-white" : ""
              }`}
              onClick={() => handleClick("map")}
            >
              Map
            </button>
          </Link>
        </>
      )}
      {user.type === "vendor" && (
        <>
          <Link to="/vendorappointments">
            <button
              className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
                activeButton === "vendorappointments"
                  ? "bg-ac6031 text-white"
                  : ""
              }`}
              onClick={() => handleClick("vendorappointments")}
            >
              Appointments
            </button>
          </Link>
        </>
      )}
      <Link to="/">
        <button
          className={`w-full py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4 ${
            activeButton === "logout" ? "bg-ac6031 text-white" : ""
          }`}
          onClick={() => {
            handleLogOut();
            handleClick("logout");
          }}
        >
          Log Out
        </button>
      </Link>
    </nav>
  );
}
