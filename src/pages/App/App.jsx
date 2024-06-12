import debug from "debug";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import Appointments from "../Appointments/Appointments";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import AddAppointment from "../../components/AddForm/AddAppointment";
import VendorAppts from "../Appointments/VendorAppts";
import Search from "../Search/Search";
import Map from "../Map/Map";
import Archive from "../Archive/Archive";
import profileImage from "../../assets/profile.png";
import apptImage from "../../assets/appt.png";
import addApptImage from "../../assets/addAppt.png";
import searchImage from "../../assets/search.png";
import archiveImage from "../../assets/archives.png";
import mapImage from "../../assets/map.png";


const log = debug("mern:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());
  const location = useLocation();

  log("user %o", user);

  const getBackgroundImage = (path) => {
    switch (path) {
      case "/appointments":
        return apptImage;
      case "/vendorappointments":
        return apptImage;
      case "/addappt":
        return addApptImage;
      case "/search":
        return searchImage;
      case "/archive":
        return archiveImage;
      case "/map":
        return mapImage;
      case "/profile":
      default:
        return profileImage;
    }
  };

  const shouldCenterContent = ["/addappt", "/search", "/archive","/map"].includes(
    location.pathname
  );

  if (!user) {
    return (
      <main className="App">
        <AuthPage setUser={setUser} />
      </main>
    );
  }

  return (
    <>
      <div
        className="flex h-screen"
        style={{
          backgroundImage: `url(${getBackgroundImage(location.pathname)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <NavBar user={user} setUser={setUser} className="bg-transparent" />
        <main
          className={`flex-1 p-6 ${
            shouldCenterContent ? "flex items-center justify-center" : ""
          }`}
        >
          <Routes>
            <Route path="/profile" element={<ProfileSection user={user} />} />
            <Route
              path="/appointments"
              element={
                <Appointments userId={user._id} dogName={user.dogName} />
              }
            />
            <Route
              path="/vendorappointments"
              element={<VendorAppts userId={user._id} />}
            />
            <Route path="/search" element={<Search userId={user._id} />} />
            <Route path="/archive" element={<Archive userId={user._id} />} />
            <Route path="/map" element={<Map />} />
            <Route
              path="/addappt"
              element={<AddAppointment userId={user._id} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
