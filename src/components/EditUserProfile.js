import React, { useState } from "react";

const EditUserProfile = ({ profile, onSave }) => {
  const { name, bio, cars, speaks, studies, from_location } = profile;

  const [editedProfile, setEditedProfile] = useState({
    name: name || "",
    bio: bio || "",
    cars: cars || [],
    speaks: speaks || [],
    studies: studies || "",
    from_location: from_location || "",
  });

  const handleInputChange = (e, field) => {
    const { value } = e.target;

    if (field === "speaks") {
      // Convert comma-separated string back to an array
      const speaksArray = value.split(",").map((item) => item.trim());
      setEditedProfile({ ...editedProfile, speaks: speaksArray });
    } else {
      // Handle other field updates
      setEditedProfile({ ...editedProfile, [field]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onSave(editedProfile); // Call onSave from parent component with updated profile
    } catch (error) {
      console.log("Error saving driver details:", error);
    }
  };

  return (
    <div className="edit-driver-profile">
      <h2>Edit Driver Profile</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedProfile.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={editedProfile.bio}
            onChange={(e) => handleInputChange(e, "bio")}
          />
        </label>
        {/* Add more fields for car details as needed */}
        <label>
          Studies:
          <input
            type="text"
            name="studies"
            value={editedProfile.studies}
            onChange={(e) => handleInputChange(e, "studies")}
          />
        </label>
        <label>
          Speaks:
          <input
            type="text"
            name="speaks"
            value={editedProfile.speaks.join(", ")}
            onChange={(e) => handleInputChange(e, "speaks")}
          />
        </label>

        <label>
          From Location:
          <input
            type="text"
            name="from_location"
            value={editedProfile.from_location}
            onChange={(e) => handleInputChange(e, "from_location")}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
