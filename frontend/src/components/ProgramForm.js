import React, { useState } from "react";

import "../index.css"
const ProgramForm = ({ onSubmit }) => {
  const [programName, setProgramName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [frequency, setFrequency] = useState(1);
  const [notes, setNotes] = useState("");

  const handleDayToggle = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const programData = {
      name: programName,
      days: selectedDays,
      frequency,
      notes,
    };
    onSubmit(programData);
  };

  return(
    <form onSubmit={handleSubmit} className="program-form">
      <div className="form-group">
        <label>Program Name:</label>
        <input
          className="form-input"
          type="text"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          required  
        />
      </div>

      <div className="form-group">
        <label>Days of the Week:</label>
        <div className="days-container">
          {["M", "T", "W", "Th", "F", "Sa", "Su"].map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => handleDayToggle(day)}
              className={`day-button ${
                selectedDays.includes(day) ? "selected-day" : ""
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Frequency (sessions/day):</label>
        <input
          className="form-input"
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          min="1"
          max="10"
        />
      </div>

      <div className="form-group">
        <label>Therapist Notes:</label>
        <textarea
          className="form-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="4"
          cols="40"
        />
      </div>

      <button type="submit" className="form-submit-button">
        Save Combo
      </button>
    </form>
  );
};

export default ProgramForm;
