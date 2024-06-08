import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const today = dayjs();
const tomorrow = today.add(1, "day");
const nextMonth = today.add(1, "month");
const endOfNextMonth = nextMonth.endOf("month");

export default function AddAppointment({ userId }) {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    service: "", // Initial state can be empty or a default value
    date: today,
    time: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/users/services");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setServices(data);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/owners/simpleappts`, {
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
      }
    };
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    console.log(e.$d);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for duplicate appointment when i submit
    const existingAppointment = appointments.find(
      (appointment) =>
        appointment.serviceId === formData.service &&
        appointment.apptDate === formData.date &&
        appointment.apptTime === formData.time
    );

    if (existingAppointment) {
      setError("You have already made this appointment!");
      return;
    }

    try {
      const response = await fetch("/api/owners/newappt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: formData.service,
          apptDate: formData.date,
          apptTime: formData.time,
          //userId: userId
          userId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Appointment created:", data);
        navigate("/appointments");
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
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
            </option>
            {services.map((service) => (
              <option key={service.serviceId} value={service.serviceId}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <DatePicker
            className="w-full p-2 border border-gray-400 rounded-md"
            name="date"
            id="date"
            defaultValue={today}
            minDate={tomorrow}
            maxDate={endOfNextMonth}
            onChange={(datePicked) =>
              setFormData({
                ...formData,
                date: dayjs(datePicked.$d).format("YYYY-MM-DD"),
              })
            }
            format="YYYY-MM-DD"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time:
          </label>

          <TimePicker
            name="time"
            id="time"
            //30min interval selection: as long as not 0 and not 30, disable
            shouldDisableTime={(value, view) => view === 'minutes' && (value.minute() !== 0 && value.minute() !== 30) }
            onChange={(timePicked) => setFormData({ ...formData, time: dayjs(timePicked.$d).format('HH:mm') })}
            format="HH:mm"
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
