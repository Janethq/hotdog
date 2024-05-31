import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  return (
    <nav>
      <NavLink to="/profile">profile</NavLink>
      {/* orderhistory */}
      &nbsp; | &nbsp;
      <NavLink to="/appointments">Appointments</NavLink>
      {/* newORder */}
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
