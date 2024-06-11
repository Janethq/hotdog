import { useState } from "react";
import debug from "debug";
import { useNavigate } from "react-router-dom";
import { login } from "../../utilities/users-service";
import "tailwindcss/tailwind.css";

const log = debug("mern:components:LoginForm");

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    log("data: %o", data);
    const { username, password } = data;

    try {
      const user = await login(username, password);
      setUser(user);
      navigate("/profile");
    } catch (error) {
      setErrorMessage("Login failed. Please check your username and password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <fieldset className="mb-6">
        <legend className="text-xl font-bold mb-4">Login</legend>

        <label className="block text-gray-700 font-bold mb-2">
          Username:
          <input
            name="username"
            className="w-full p-2 border border-gray-400 rounded-md"
          />
        </label>
        <br />

        <label className="block text-gray-700 font-bold mb-2">
          Password:
          <input
            name="password"
            type="password"
            className="w-full p-2 border border-gray-400 rounded-md"
          />
        </label>
        <br />
        <button className="bg-[#ac6031] hover:bg-[#ba2d4c] text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </fieldset>
    </form>
  );
}
