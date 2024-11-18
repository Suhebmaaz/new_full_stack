import React, { useState, useEffect } from "react";
import { fetchPrograms } from "../api/api";

const SavedProgramsDropdown = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const fetchedPrograms = await fetchPrograms();
        setPrograms(fetchedPrograms || []);
      } catch (err) {
        setError("Error fetching programs.");
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const handleProgramClick = (program) => {
    setSelectedProgram((prevProgram) =>
      prevProgram?.id === program.id ? null : program
    );
  };

  if (loading) {
    return <p>Loading saved programs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dropdown-container">
      <h3 className="dropdown-heading" >Saved Programs</h3>
      {programs.length === 0 ? (
        <p>No programs found.</p>
      ) : (
        <ul className="category-list">
          {programs.map((program) => (
            <li key={program.id} className="category-item">
              <button
                className="category-button"
                onClick={() => handleProgramClick(program)}
              >
                {program.name}
              </button>
              {selectedProgram?.id === program.id && (
                <div className="program-details">
                  <p>
                    <strong>Days:</strong> {program.days.join(", ")}
                  </p>
                  <p>
                    <strong>Frequency:</strong> {program.frequency}
                  </p>
                  <p>
                    <strong>Notes:</strong> {program.notes}
                  </p>
                  <ul>
                    {program.exercises.map((exercise, index) => (
                      <li key={index}>
                        {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                        {exercise.holdTime > 0 && ` (Hold Time: ${exercise.holdTime}s)`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedProgramsDropdown;
