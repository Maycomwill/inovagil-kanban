import { Draggable, Droppable } from "react-beautiful-dnd";
import { Tasks } from "../../interfaces/Tasks";
import TaskCard from "../TaskCard";
import { Category } from "../../interfaces/Categories";
import DeleteCategory from "../Dialogs/DeleteCategory";

function Board({ category }: { category: Category }) {
  return (
    <Droppable droppableId={category.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="group relative h-[320px] max-h-[320px] w-full rounded bg-zinc-500 py-4 text-center dark:bg-slate-900"
        >
          <DeleteCategory categoryId={category.id} />
          <span className="text-lg font-bold">{category.name}</span>
          <div className="w-full overflow-hidden rounded px-2 pb-4">
            <div className="max-h-[240px] overflow-y-auto px-2 pb-2">
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
