import { Draggable, Droppable } from "react-beautiful-dnd";
import { Tasks } from "../../interfaces/Tasks";
import TaskCard from "../TaskCard";
import { Category } from "../../interfaces/Categories";

function Board({ category }: { category: Category }) {
  return (
    <Droppable droppableId={category.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="max-h-[420px] w-full overflow-y-auto rounded bg-zinc-500 py-4 text-center dark:bg-slate-900"
        >
          <span className="text-lg font-bold">{category.name}</span>
          <div className="w-full overflow-hidden rounded px-6 pb-4">
            <div>
              {category.tasks.map((task: Tasks, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? "0.5" : "1",
                        }}
                      >
                        <TaskCard task={task} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Board;
