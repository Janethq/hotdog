import { useEffect, useState } from "react";

const ProfileSection = ({ user }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!user || !user.username) {
      console.error("Username is not defined");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users/${user.username}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
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

  return (
    <>
      <h2>Profile Details</h2>
      <div>
        <label>Name: </label>
        <span>{profileData.name}</span>
      </div>
      <div>
        <label>Dog Name: </label>
        <span>{profileData.dogName}</span>
      </div>
      <div>
        <label>Breed: </label>
        <span>{profileData.breed}</span>
      </div>
      <div>
        <label>Weight: </label>
        <span>{profileData.weight} kg</span>
      </div>
      <div>
        <label>Username: </label>
        <span>{profileData.username}</span>
      </div>
      <div>
        <label>Password: </label>
        <span>{profileData.password}</span>
      </div>
    </>
  );
};

export default ProfileSection;
