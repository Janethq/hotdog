import { useEffect, useState } from "react";

export default function SearchAppointments({ userId }) {
  const [services, setServices] = useState([]);
  const [searchService, setSearchService] = useState("");
  const [appointments, setAppointments] = useState([]);
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
        // Filter out expired appointments
        const filteredData = data.filter((appt) => {
          const apptDateTime = new Date(`${appt.apptDate}T${appt.apptTime}`);
          const currentDateTime = new Date();
          return apptDateTime > currentDateTime;
        });
        setAppointments(filteredData);
        const uniqueServices = [
          ...new Set(filteredData.map((appt) => appt.serviceId.service)),
        ];
        setServices(uniqueServices);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, [userId]);

  const handleSearchChange = (event) => {
    setSearchService(event.target.value);
    const filteredAppointments = appointments.filter((appt) => {
      return appt.serviceId.service === event.target.value;
    });
    setFilteredAppointments(filteredAppointments);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex mb-4">
        <label className="mr-2">Search by Service:</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1"
          value={searchService}
          onChange={handleSearchChange}
        >
          <option value="">Select a Service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      {searchService && (
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
      )}
    </div>
  );
}
