// import React, { useState } from "react";
// import RideCard from "./RideCard";

// const RideList = ({ rides }) => {
//   const [filteredRides, setFilteredRides] = useState(rides);

//   const handleSort = (method) => {
//     let sortedRides = [...filteredRides];
//     if (method === "date") {
//       sortedRides.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }
//     // Add other sorting methods as needed
//     setFilteredRides(sortedRides);
//   };

//   return (
//     <div className="ride-listings">
//       <h2>List of Rides</h2>
//       <div className="ride-filters">
//         <button onClick={() => handleSort("date")}>Sort by Date</button>
//         {/* Add other filter buttons as needed */}
//       </div>
//       <div className="ride-cards">
//         {filteredRides.map((ride, index) => (
//           <RideCard key={index} ride={ride} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RideList;

import React, { useEffect, useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { fetchOrdersByUserId } from "../store/orderReducer.js";
import { Link } from "react-router-dom";
import RideCard from "./RideCard";

const dummyRides = [
  {
    id: 1,
    rideDate: "2023-12-01T10:00:00Z",
    totalCost: 50,
    orderDate: "2023-11-25T12:00:00Z",
  },
  {
    id: 2,
    rideDate: "2023-12-02T15:30:00Z",
    totalCost: 35,
    orderDate: "2023-11-26T14:20:00Z",
  },
];

const RideList = () => {
  //const userId = user.id;
  //const dispatch = useDispatch();
  //const orders = useSelector((state) => state.rides.rides);
  const rides = dummyRides;

  //   useEffect(() => {
  //     if (userId) {
  //       dispatch(fetchOrdersByUserId(userId));
  //     }
  //   }, [userId, dispatch]);

  //   useEffect(() => {
  //     rides.forEach((ride) => console.log(ride.rideDate)); // Add this line
  //   }, [rides]);

  //   const formatDate = (dateString) => {
  //     // Split the date string into components
  //     const [datePart, timePart] = dateString.split("T");
  //     const [year, month, day] = datePart
  //       .split("-")
  //       .map((num) => parseInt(num, 10));
  //     // Create a new date object using UTC date components
  //     const date = new Date(Date.UTC(year, month - 1, day + 1));

  //     // Return the date in local time zone
  //     return date.toLocaleDateString();
  //   };

  return (
    <div className="rides-list-container">
      <h3>My Rides</h3>
      <ul>
        {rides.map((ride) => (
          <Link to={`/ride/${ride.id}`} key={ride.id}>
            {/* <li>
              Order Number: 000{order.id} - Total Price: ${order.totalCost}{" "}
               - Date: {new Date(order.orderDate).toLocaleDateString()} 
              -
              Date: {formatDate(order.orderDate)}
            </li> */}
            <RideCard key={ride.id} ride={ride} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RideList;
