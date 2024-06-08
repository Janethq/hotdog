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
        console.log(data);
        console.log({ userId }); //filter data by this
        const filteredAppointments = data.filter(
          (appt) => appt.serviceId._id === userId
        );
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

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
      {appointments.map((appt) => (
        <section key={appt._id} className="mb-4 p-4 border-b border-gray-200">
          <div>
            <p>
              <strong>Service userId:</strong> {appt.serviceId._id}
            </p>
            <p>
              <strong>Vendor:</strong> {appt.serviceId.companyName}
            </p>
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
              <strong>Weight:</strong> {appt.userId.weight}
              {"kg"}
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
