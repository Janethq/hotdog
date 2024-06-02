import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-64 h-screen flex flex-col bg-blue-500 text-white p-6 pt-12">
      <NavLink
        to="/profile"
        className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        Profile
      </NavLink>
      {/* orderhistory */}
      <div className="h-px bg-gray-700"></div>
      <NavLink
        to="/appointments"
        className="py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        Appointments
      </NavLink>
      {/* newORder */}
      <div className="h-px bg-gray-700"></div>
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
