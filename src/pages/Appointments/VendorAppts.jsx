import { useEffect, useState } from "react";

export default function VendorAppts({ userId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const response = await fetch(`/api/owners/allappts`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        console.log("UserID:", userId);

        // Filter out expired appointments
        const currentDate = new Date();
        const filteredAppointments = data.filter(
          (appt) =>
            appt.serviceId._id === userId &&
            new Date(appt.apptDate + "T" + appt.apptTime) > currentDate
        );

        console.log("Filtered appointments:", filteredAppointments);

        // Sort appointments by earliest time
        filteredAppointments.sort((a, b) => {
          const timeA = new Date(`${a.apptDate}T${a.apptTime}`);
          const timeB = new Date(`${b.apptDate}T${b.apptTime}`);
          return timeA - timeB;
        });

        setAppointments(filteredAppointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllAppointments();
  }, [userId]); // Include userId in the dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
      {appointments.map((appt, index) => (
        <section
          key={appt._id}
          className={`mb-4 p-4 border-b border-gray-200 ${
            index === 0 ? "bg-yellow-100" : ""
          }`}
        >
          <div>
            <p>
              <strong>Owner:</strong> {appt.userId.name}
            </p>
            <p>
              <strong>Dog Name:</strong> {appt.userId.dogName}
            </p>
            <p>
              <strong>Breed:</strong> {appt.userId.breed}
            </p>
            <p>
              <strong>Weight:</strong> {appt.userId.weight} kg
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(appt.apptDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {appt.apptTime}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
