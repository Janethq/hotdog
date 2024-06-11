import { useEffect, useState } from "react";

export default function Archive({ userId }) {
  const [filteredAppointments, setFilteredAppointments] = useState([]);

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

        // Filter appt by expired date/time
        const filteredData = data.filter((appt) => {
          const apptDateTime = new Date(`${appt.apptDate}T${appt.apptTime}`);
          const currentDateTime = new Date();
          return apptDateTime < currentDateTime; // Check if appointment alr expired
        });

        setFilteredAppointments(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, [userId]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Fun Past-times</h2>
      <div>
        {filteredAppointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4"
          >
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
              {appt.serviceId.serviceDuration}Hr
            </p>
            <p>
              <strong>Date:</strong> {appt.apptDate}
            </p>
            <p>
              <strong>Time:</strong> {appt.apptTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}