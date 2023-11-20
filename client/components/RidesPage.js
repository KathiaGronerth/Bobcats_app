import React, { useState, useEffect } from "react";
import FindRideForm from "./FindRideForm";
import axios from "axios";

const RidesPage = () => {
  const [rides, setRides] = useState([]);
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get("/api/rides");
        setRides(response.data);
      } catch (error) {
        console.error("Error fetching rides", error);
      }
    };

    fetchRides();
  }, []);

  const handleFilterChange = (newFilterData) => {
    setFilterData(newFilterData);
  };

  return (
    <div>
      <FindRideForm
        onFilterChange={handleFilterChange}
        rides={rides}
        filterData={filterData}
      />
    </div>
  );
};

export default RidesPage;
