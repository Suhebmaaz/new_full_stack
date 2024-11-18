import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ExerciseCard from "./ExerciseCard";
import "../index.css"

const ExerciseList = ({
  exercises,
  onUpdateExercise,
  onDeleteExercise,
  onDuplicateExercise,
  onReorder,
}) => {
  const handleDragEnd = (result) => {
    console.log("Drag result:", result);
    if (!result.destination) return;

    const reordered = Array.from(exercises);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    onReorder(reordered);
  };
  console.log("Exercises in ExerciseList:", exercises);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="exerciseList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="exercise-list-container"
          >
            {exercises.map((exercise, index) => (
              <Draggable
                key={exercise.id}
                draggableId={exercise.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="draggable-exercise"
                  >
                    <ExerciseCard
                      exercise={exercise}
                      onUpdate={onUpdateExercise}
                      onDelete={onDeleteExercise}
                      onDuplicate={onDuplicateExercise}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ExerciseList;
