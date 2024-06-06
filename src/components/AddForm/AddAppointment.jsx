import { useState } from "react";

export default function AddAppointment({userId}) {
  const [formData, setFormData] = useState({
    service: "", // Initial state can be empty or a default value
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/owners/newappt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: formData.service,
          ApptDate: formData.date,
          ApptTime: formData.time,
          //userId: userId
          userId
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Appointment created:", data);
      } else {
        const errorData = await response.json();
        console.error("Error creating appointment:", errorData);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <fieldset className="mb-6">
        <legend className="text-xl font-bold mb-4">Add Appointment</legend>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="service"
          >
            Service:
          </label>
          <select
            name="service"
            id="service"
            className="w-full p-2 border border-gray-400 rounded-md"
            onChange={handleChange}
            value={formData.service}
            required
          >
            <option value="" disabled>
              Select a service
            </option>{" "}
            {/* Add this line */}
            <option value="grooming">Grooming</option>
            <option value="vet">Vet visit</option>
            <option value="agility">Agility class</option>
            <option value="obedience">Obedience training</option>
            <option value="swim">Swim session</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="w-full p-2 border border-gray-400 rounded-md"
            onChange={handleChange}
            value={formData.date}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time:
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="w-full p-2 border border-gray-400 rounded-md"
            onChange={handleChange}
            value={formData.time}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </fieldset>
    </form>
  );
}
