import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../utilities/users-service";


export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  console.log(navigate)
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav className="w-64 bg-transparent text-black p-6 pt-12">
      <Link to="/profile">
        <button className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4">
          Profile
        </button>
      </Link>
      <div className="h-px bg-gray-700 mb-4"></div>
      {user.type === "owner" && (
        <>
          <Link to="/appointments">
            <button className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4">
              Appointments
            </button>
          </Link>
          <div className="h-px bg-gray-700 mb-4"></div>
          <Link to="/addappt">
            <button className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4">
              Add Appointment
            </button>
          </Link>
          <div className="h-px bg-gray-700 mb-4"></div>
          <Link to="/search">
            <button className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4">
              Search
            </button>
          </Link>
          <div className="h-px bg-gray-700 mb-4"></div>
          <Link to="/archive">
            <button className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4">
              Archives
            </button>
          </Link>
          <div className="h-px bg-gray-700 mb-4"></div>
        </>
      )}
      {user.type === "vendor" && (
        <>
          <Link to="/vendorappointments">
            <button className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4">
              Appointments
            </button>
          </Link>
          <div className="h-px bg-gray-700 mb-4"></div>
        </>
      )}
      <Link to="/">
        <button
          className="py-2 px-4 bg-gray-200 hover:bg-[#ac6031] hover:text-white transition duration-300 rounded mb-4"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </Link>
    </nav>
  );
}
