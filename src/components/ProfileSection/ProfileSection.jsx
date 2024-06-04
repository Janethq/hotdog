const Profile = ({ username, password, name, dogName, breed, weight }) => {
  return (
    <>
      <h2>Profile Details</h2>
      <div>
        <label>Name: </label>
        <span>{name}</span>
      </div>
      <div>
        <label>Dog Name: </label>
        <span>{dogName}</span>
      </div>
      <div>
        <label>Breed: </label>
        <span>{breed}</span>
      </div>
      <div>
        <label>Weight: </label>
        <span>{weight} kg</span>
      </div>
      <div>
        <label>Username: </label>
        <span>{username}</span>
      </div>
      <div>
        <label>Password: </label>
        <span>{password}</span>
      </div>
    </>
  );
};

export default Profile;
