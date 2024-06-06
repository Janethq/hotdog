import { useEffect, useState } from "react";

export default function Appointments({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // ok test if this works now//id is undefined screen shots~~ =P
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id} className="mb-4">
            <p>
              <strong>Service:</strong> {appt.service}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(appt.ApptDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {appt.ApptTime}
            </p>
            <button>Edit</button>
            <button>Save</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
