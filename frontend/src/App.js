import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import ExerciseList from "./components/ExerciseList";
import ProgramForm from "./components/ProgramForm";
import { v4 as uuidv4 } from "uuid"; 
import "./index.css"

import { saveProgram } from "./api/api";
import SavedPrograms from "./components/savedProgram";



const App = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  
  const [programDetails, setProgramDetails] = useState(null);

  const handleSelectExercise = (exerciseName) => {
    const newExercise = {
      id: uuidv4(), // Generate a unique ID for each exercise
      name: exerciseName,
      sets: 0,
      reps: 0, 
      holdTime: 0,
      side: "Left",
    };
    setSelectedExercises([...selectedExercises, newExercise]);
  };

  const handleUpdateExercise = (updatedExercise) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };

  const handleDeleteExercise = (exerciseToDelete) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((ex) => ex.id !== exerciseToDelete.id)
    );
  };

  const handleDuplicateExercise = (exerciseToDuplicate) => {
    const duplicate = { ...exerciseToDuplicate, id: uuidv4(), side: "Right" };
    setSelectedExercises([...selectedExercises, duplicate]);
  };

  const handleReorderExercises = (reorderedExercises) => {
    setSelectedExercises(reorderedExercises);
  };

const clearProgram=()=>{
  setSelectedExercises([]);
        setProgramDetails(null);
}
  const handleProgramSubmit = (programData) => {
    setProgramDetails(programData); // Save the form data
    console.log(programData,"programData");
    
    try {
      let response=saveProgram({...programData,exercises: selectedExercises})  
      if (response) {
        alert("Combo saved successfully!");
        setSelectedExercises([]);
        setProgramDetails(null);
      }
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to save program",error);
    }
  };
    
  return (
    <div>
      <h1 className="head">ROOTALLY AI</h1>
      <div className="flex-container">
  <Dropdown onSelectExercise={handleSelectExercise} />
  <SavedPrograms />
</div>
      
      {selectedExercises.length > 0 && (<h3>Selected Exercises</h3>)}
      <ExerciseList
        exercises={selectedExercises} 
        onUpdateExercise={handleUpdateExercise}
        onDeleteExercise={handleDeleteExercise}
        onDuplicateExercise={handleDuplicateExercise}
        onReorder={handleReorderExercises}
      />
      {selectedExercises.length > 0 && (
        <button
          onClick={clearProgram}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#dc3545", 
            color: "white",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Clear Selected Exercises
        </button>
      )}
      

      <div>
      <h1>Exercise Program Builder</h1>
      <ProgramForm onSubmit={handleProgramSubmit} />
    </div>
    </div>
  );
};

export default App;
