


export default function AddAppointment() {

  const handleSubmit = ()=>{

  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add Appointment</legend>
        <label>Service:</label>

        <select name="service" id="service">
          <option value="grooming">Grooming</option>
          <option value="vet">Vet visit</option>
          <option value="agility">Agility class</option>
          <option value="obedience">Obedience training</option>
          <option value="swim">Swim session</option>
        </select>
        <br/>

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
