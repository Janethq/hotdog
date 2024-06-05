import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

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
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
        <div className="mb-4">
          <label className="block font-semibold">Name: </label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          ) : (
            <span className="mt-1 block">{profileData.name}</span>
          )}
        </div>
        {user.type === "owner" ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold">Dog Name: </label>
              {editing ? (
                <input
                  type="text"
                  name="dogName"
                  value={formData.dogName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">{profileData.dogName}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Breed: </label>
              {editing ? (
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">{profileData.breed}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Weight: </label>
              {editing ? (
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">{profileData.weight} kg</span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-semibold">Company Name: </label>
              {editing ? (
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">{profileData.companyName}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Service: </label>
              {editing ? (
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">{profileData.service}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Address: </label>
              {editing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">{profileData.address}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">
                Opening Hours (Start):{" "}
              </label>
              {editing ? (
                <input
                  type="time"
                  name="openingHoursStart"
                  value={formData.openingHoursStart}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">
                  {profileData.openingHoursStart}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">
                Opening Hours (End):{" "}
              </label>
              {editing ? (
                <input
                  type="time"
                  name="openingHoursEnd"
                  value={formData.openingHoursEnd}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">
                  {profileData.openingHoursEnd}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold">
                Service Duration (hours):{" "}
              </label>
              {editing ? (
                <input
                  type="number"
                  name="serviceDuration"
                  value={formData.serviceDuration}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              ) : (
                <span className="mt-1 block">
                  {profileData.serviceDuration}
                </span>
              )}
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block font-semibold">Username: </label>
          <span className="mt-1 block">{profileData.username}</span>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Password: </label>
          <span className="mt-1 block">******</span>
        </div>
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};
export default ProfileSection;
