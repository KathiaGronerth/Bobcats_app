import React, { useState } from "react";

const SearchRides = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Search logic goes here
  };

  return (
    <div>
      <h2>Search for Rides</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {/* List of RideCard components would go here */}
    </div>
  );
};

export default SearchRides;
