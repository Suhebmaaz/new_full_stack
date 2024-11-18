import React, { useState } from "react";
import "../index.css";

const ExerciseCard = ({ exercise, onUpdate, onDelete, onDuplicate }) => {
  const [details, setDetails] = useState({
    sets: exercise.sets || 0,
    reps: exercise.reps || 0,
    holdTime: exercise.holdTime || 0,
    side: exercise.side || "Left",
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to manage menu visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
    onUpdate({ ...exercise, [name]: value });
  };

  const handleToggleSide = () => {
    const newSide = details.side === "Left" ? "Right" : "Left";
    setDetails({ ...details, side: newSide });
    onUpdate({ ...exercise, side: newSide });
  };

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState); // Toggle menu visibility
  };

  return (
    <div className="exercise-card">
      <div className="exercise-header">
      <button className="hamburger-icon" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <h4 className="exercise-name">{exercise.name}</h4>
        
      </div>

      {/* Menu visible when isMenuVisible is true */}
      {isMenuVisible && (
        <div className="exercise-settings">
          <div className="exercise-input-group">
            <label>
              Sets:
              <input
                className="exercise-input"
                type="number"
                name="sets"
                value={details.sets}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="exercise-input-group">
            <label>
              Reps:
              <input
                className="exercise-input"
                type="number"
                name="reps"
                value={details.reps}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="exercise-input-group">
            <label>
              Hold Time (sec):
              <input
                className="exercise-input"
                type="number"
                name="holdTime"
                value={details.holdTime}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="exercise-side-toggle">
            <label>
              Side:{" "}
              <button className="side-toggle-button" onClick={handleToggleSide}>
                {details.side}
              </button>
            </label>
          </div>

          <div className="exercise-actions">
            <button
              className="action-button duplicate-button"
              onClick={() => onDuplicate(exercise)}
            >
              Duplicate
            </button>
            <button
              className="action-button delete-button"
              onClick={() => onDelete(exercise)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
