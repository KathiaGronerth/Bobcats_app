// CombinedHistory.js

import React, { useState } from "react";
import PassengerHistory from "./PassengerHistory";
import DriverHistory from "./DriverHistory";
import "./CombinedHistory.css";

const CombinedHistory = () => {
  const [activeTab, setActiveTab] = useState("passenger");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="combined-history-container">
      <div className="history-tabs">
        <div
          className={`history-tab ${activeTab === "passenger" ? "active" : ""}`}
          onClick={() => handleTabChange("passenger")}
        >
          Passenger History
        </div>
        <div
          className={`history-tab ${activeTab === "driver" ? "active" : ""}`}
          onClick={() => handleTabChange("driver")}
        >
          Driver History
        </div>
      </div>

      <div className="history-content">
        {activeTab === "passenger" && <PassengerHistory paddingTop={0} />}
        {activeTab === "driver" && <DriverHistory />}
      </div>
    </div>
  );
};

export default CombinedHistory;
