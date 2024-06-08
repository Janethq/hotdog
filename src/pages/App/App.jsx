import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import Appointments from "../Appointments/Appointments";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import AddAppointment from "../../components/AddForm/AddAppointment";
import VendorAppts from "../Appointments/VendorAppts";

const log = debug("mern:pages:App:App");

function App() {
  const [user, setUser] = useState(getUser());
  log("user %o", user);
  if (!user) {
    return (
      <main className="App">
        <AuthPage setUser={setUser} />
      </main>
    );
  }

  return (
    <>
      <div className="flex h-screen">
        <NavBar user={user} setUser={setUser} />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/profile" element={<ProfileSection user={user} />} />
            <Route
              path="/appointments"
              element={<Appointments userId={user._id} dogName={user.dogName} />}
            />
            <Route
              path="/vendorappointments"
              element={<VendorAppts userId={user._id} />}
            />
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
