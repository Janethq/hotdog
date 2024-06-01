import debug from "debug";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import Appointments from "../Appointments/Appointments";
import Profile from "../Profile/Profile";
import AddAppointment from "../../components/AddForm/AddAppointment";
import AddSlot from "../../components/AddForm/AddSlot";

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
      <main className="App">
        <NavBar setUser={setUser} />

        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/addappt" element={<AddAppointment />} />
          <Route path="/addslot" element={<AddSlot />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
