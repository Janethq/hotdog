import { useEffect, useState } from "react";

export default function Appointments({ userId, dogName }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/owners/appts/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        console.log(data);
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleEdit = (apptId) => {
    setEditing(apptId);
    const appt = appointments.find((appt) => appt._id === apptId);
    setFormData(appt);
  };

  const handleSave = async (apptId) => {
    try {
      const response = await fetch(`/api/owners/appts/${apptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }
      const updatedAppointments = appointments.map((appt) =>
        appt._id === apptId ? formData : appt
      );
      setAppointments(updatedAppointments);
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (apptId) => {
    try {
      const response = await fetch(`/api/owners/appts/${apptId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      const updatedAppointments = appointments.filter(
        (appt) => appt._id !== apptId
      );
      setAppointments(updatedAppointments);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Filter out expired appointments
  const filteredAppointments = appointments.filter((appt) => {
    const apptDateTime = new Date(`${appt.apptDate}T${appt.apptTime}`);
    const currentDateTime = new Date();
    return apptDateTime > currentDateTime;
  });

  // Sort appointments by earliest time
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const timeA = new Date(`${a.apptDate}T${a.apptTime}`);
    const timeB = new Date(`${b.apptDate}T${b.apptTime}`);
    return timeA - timeB;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">{dogName}&apos;s Appointments</h2>
      {sortedAppointments.map((appt, index) => (
        <section
          key={appt._id}
          className={`mb-4 p-4 border-b border-gray-200 ${
            index === 0 ? "bg-yellow-100" : ""
          }`}
        >
          {editing === appt._id ? (
            // Editing mode
            <div>
              <p>
                <strong>{appt.serviceId.service}</strong>
              </p>
              <p>
                <strong>Address:</strong> {appt.serviceId.address}
              </p>
              <p>
                <strong>Operating Hours:</strong>{" "}
                {appt.serviceId.openingHoursStart} -{" "}
                {appt.serviceId.openingHoursEnd}
              </p>
              <p>
                <strong>Service Duration:</strong>{" "}
                {appt.serviceId.serviceDuration}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                <input
                  type="date"
                  name="apptDate"
                  value={formData.apptDate}
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                <strong>Time:</strong>{" "}
                <input
                  type="time"
                  name="apptTime"
                  value={formData.apptTime}
                  onChange={handleChange}
                  required
                />
              </p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                onClick={() => handleSave(appt._id)}
              >
                Save
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            // Viewing mode
            <div>
              <p>
                <strong>{appt.serviceId.service}</strong>
              </p>
              <p>
                <strong>Address:</strong> {appt.serviceId.address}
              </p>
              <p>
                <strong>Operating Hours:</strong>{" "}
                {appt.serviceId.openingHoursStart} -{" "}
                {appt.serviceId.openingHoursEnd}
              </p>
              <p>
                <strong>Service Duration:</strong>{" "}
                {appt.serviceId.serviceDuration}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appt.apptDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appt.apptTime}
              </p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                onClick={() => handleEdit(appt._id)}
              >
                Edit
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={() => handleDelete(appt._id)}
              >
                Delete
              </button>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}