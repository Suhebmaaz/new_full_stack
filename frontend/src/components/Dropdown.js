import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/api";
import "../index.css";

const Dropdown = ({ onSelectExercise }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from the backend
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => alert("Error fetching categories"));
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleExerciseClick = (exercise) => {
    onSelectExercise(exercise);
  };

  return (
    <div className="dropdown-container">
      <h3 className="dropdown-heading ">Select Exercise Category</h3>
      <div className="dropdown">
        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category.id}
              className="category-item"
              onMouseEnter={() => setSelectedCategory(category)} // Hover to set category
              onMouseLeave={() => setSelectedCategory(null)}  // Leave hover to close category
            >
              <div className="category-button-container">
                <button
                  className="category-button"
                  onClick={() => handleCategorySelect(category)} // Select category on click
                >
                  {category.name}
                </button>
              </div>
              {/* Show exercises on hover */}
              {selectedCategory === category && (
                <div className="exercise-submenu">
                  {category.exercises.map((exercise, index) => (
                    <button
                      key={index}
                      className="exercise-button"
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      {exercise}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* {selectedCategory && (
        <div className="exercise-list">
          <h4 className="exercise-heading">{selectedCategory.name} Exercises</h4>
          <ul className="exercise-items">
            {selectedCategory.exercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <button
                  className="exercise-button"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  {exercise}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Dropdown;
