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
    <div className="edit-driver-profile" style={{border: "1.5px solid #ccc", background: "#fff"}}>
      
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <h2 style={{fontSize: "22px", background: "#fff", marginBottom: "15px"}}>Edit Driver Profile</h2>
        <label>
          Name:</label>
          <input
            type="text"
            name="name"
            value={editedProfile.name}
            onChange={(e) => handleInputChange(e, "name")}
            style={{width:"90%",
              padding: "10px",
              border: "2px solid #C0C0C0",
              borderRadius: "4px",
              padding: "10px",
              width: "50%", 
              marginBottom: "20px"
             }}
          />
        
        <label>
          Bio: </label>
          <textarea
            name="bio"
            value={editedProfile.bio}
            onChange={(e) => handleInputChange(e, "bio")}
            style={{width:"90%",
            padding: "10px",
            border: "2px solid #C0C0C0",
            borderRadius: "4px",
            width: "50%",
            marginBottom: "20px"
           }}
          />
       
        {/* Add more fields for car details as needed */}
        <label>
          Studies:  </label>
          <input
            type="text"
            name="studies"
            value={editedProfile.studies}
            onChange={(e) => handleInputChange(e, "studies")}
            style={{width:"90%",
            padding: "10px",
            border: "2px solid #C0C0C0",
            borderRadius: "4px",
            padding: "10px",
            width: "50%",
            marginBottom: "20px"
           }}
          />
      
        <label>
          Speaks: </label>
          <input
            type="text"
            name="speaks"
            value={editedProfile.speaks.join(", ")}
            onChange={(e) => handleInputChange(e, "speaks")}
            style={{width:"90%",
            padding: "10px",
            border: "2px solid #C0C0C0",
            borderRadius: "4px",
            padding: "10px",
            marginBottom: "20px",
            width: "50%",
           
           }}
          />
       

        <label>
          From Location: </label>
          <input
            type="text"
            name="from_location"
            value={editedProfile.from_location}
            onChange={(e) => handleInputChange(e, "from_location")}
            style={{width:"90%",
            padding: "10px",
            border: "2px solid #C0C0C0",
            borderRadius: "4px",
            padding: "10px",
            width: "50%",
            marginBottom: "20pxx"
            
           }}
          />
       
        <button type="submit" style={{color: "#fff", borderRadius: "25px", backgroundColor: "#00aff5", margin: "20px"}}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
