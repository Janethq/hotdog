import { useEffect, useState } from "react";

const ProfileSection = ({ user }) => {
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!user || !user.username) {
      console.error("Username not defined");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users/${user.username}`);
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        const data = await response.json();
        setProfileData(data);
        setFormData(data);
      } catch (error) {
        console.error("fetch error", error);
      }
    };

    fetchProfileData();
  }, [user]);

  if (!user || !user.username) {
    return <div>Username is not available.</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${user.username}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      setProfileData(formData);
      setEditing(false);
    } catch (error) {
      console.error("save error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <h2>Profile Details</h2>
      <div>
        <label>Name: </label>
        {editing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        ) : (
          <span>{profileData.name}</span>
        )}
      </div>
      <div>
        <label>Dog Name: </label>
        {editing ? (
          <input
            type="text"
            name="dogName"
            value={formData.dogName}
            onChange={handleChange}
          />
        ) : (
          <span>{profileData.dogName}</span>
        )}
      </div>
      <div>
        <label>Breed: </label>
        {editing ? (
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
        ) : (
          <span>{profileData.breed}</span>
        )}
      </div>
      <div>
        <label>Weight: </label>
        {editing ? (
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        ) : (
          <span>{profileData.weight} kg</span>
        )}
      </div>
      <div>
        <label>Username: </label>
        <span>{profileData.username}</span>
      </div>
      <div>
        <label>Password: </label>
        <span>******</span>
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </>
  );
};

export default ProfileSection;
