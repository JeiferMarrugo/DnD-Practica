import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useState, useEffect } from "react";

const initialTodos = JSON.parse(localStorage.getItem('todos')) || []

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const starIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [orderArray] = copyArray.splice(starIndex, 1);

    copyArray.splice(endIndex, 0, orderArray);
    setTodos(copyArray);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo App</h1>
      <Droppable droppableId="todos">
        {(DrooppableProvider) => (
          <ul
            ref={DrooppableProvider.innerRef}
            {...DrooppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(DraggableProvider) => (
                  <li
                    ref={DraggableProvider.innerRef}
                    {...DraggableProvider.draggableProps}
                    {...DraggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {DrooppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
