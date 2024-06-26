import debug from "debug";
import { Outlet } from "react-router-dom";
import { checkToken } from "../../utilities/users-service";

const log = debug("mern:pages:OrderHistoryPage");

export default function Profile() {
  const handleCheckToken = async () => {
    const expDate = await checkToken();
    log("expDate: %o", expDate);
  };

  return (
    <>
      <p>Profile Page</p>
      <button onClick={handleCheckToken}>Check Login</button>
      <Outlet />
    </>
  );
}
