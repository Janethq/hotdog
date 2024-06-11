import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav className="w-64 bg-blue-500 text-white p-6 pt-12">
      <NavLink
        to="/profile"
        className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        Profile
      </NavLink>
      <div className="h-px bg-gray-700"></div>
      {user.type === "owner" && (
        <>
          <NavLink
            to="/appointments"
            className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Appointments
          </NavLink>
          <div className="h-px bg-gray-700"></div>
          <NavLink
            to="/addappt"
            className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Add Appointment
          </NavLink>
          <div className="h-px bg-gray-700"></div>
          <NavLink
            to="/search"
            className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Search
          </NavLink>
          <div className="h-px bg-gray-700"></div>
          <NavLink
            to="/archive"
            className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Archives
          </NavLink>
          <div className="h-px bg-gray-700"></div>
        </>
      )}
      {user.type === "vendor" && (
        <>
          <NavLink
            to="/vendorappointments"
            className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Appointments
          </NavLink>
          <div className="h-px bg-gray-700"></div>
        </>
      )}
      <Link
        to=""
        onClick={handleLogOut}
        className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        Log Out
      </Link>
    </nav>
  );
}
