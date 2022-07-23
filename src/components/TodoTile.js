import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TodoTile = ({ index, id, title, desc }) => {
    console.log(id);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div className="todo-tile"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
          <div className="todo-title">{title}</div>
          <div className="todo-desc">{desc}</div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoTile;
