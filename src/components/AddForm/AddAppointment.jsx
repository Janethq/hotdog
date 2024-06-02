import "tailwindcss/tailwind.css";

export default function AddAppointment() {
  //for dog owners
  const handleSubmit = () => {
    // Handle form submission
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
          >
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
