export default function AddAppointment() {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add Appointment</legend>

        <label>
          Date:
          <input type="date" name="Date" />
        </label>
        <br />

        <label>
          Time:
          <input type="time" name="Time" />
        </label>
        <br />
        <button type="submit">Add</button>
      </fieldset>
    </form>
  );
}
