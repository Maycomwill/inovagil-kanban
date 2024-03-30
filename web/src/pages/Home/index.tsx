import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import Loading from "../../components/Loading";

import { useCategories } from "../../hooks/useCategories";
import { Tasks } from "../../interfaces/Tasks";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import TaskCard from "../../components/TaskCard";
import { Category } from "../../interfaces/Categories";
import { useTasks } from "../../hooks/useTasks";
import Header from "../../components/Header";

function Home() {
  const { getUserData, data } = useUser();
  const { getCategories, categories } = useCategories();
  const { patchTask } = useTasks();
  const id = localStorage.getItem("userData");

  useEffect(() => {
    getUserData();
    if (id !== null) {
      getCategories(id);
    }
  }, []);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const { destination, source, draggableId } = result;
    if (destination.droppableId === source.droppableId) return;
    if (!categories) return;
    console.log(result);
    const sourceColIndex = categories.findIndex(
      (category: Category) => category.id === source.droppableId,
    );
    const destinationColIndex = categories.findIndex(
      (category: Category) => category.id === destination.droppableId,
    );

    const sourceCol = categories[sourceColIndex];
    const destinationCol = categories[destinationColIndex];

    const sourceTask = [...sourceCol.tasks];
    const destinationTask = [...destinationCol.tasks];
    const [removed] = sourceTask.splice(source.index, 1);
    destinationTask.splice(destination.index, 0, removed);

    categories[sourceColIndex].tasks = sourceTask;
    categories[destinationColIndex].tasks = destinationTask;

    patchTask({ id: draggableId, categoryId: destination.droppableId });
  }

  if (data === undefined || categories === undefined) {
    return <Loading />;
  }
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-y-auto">
      <Header user={data} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section
          className="absolute top-20 flex w-[80%] max-w-[80%] flex-col items-center justify-center overflow-x-auto text-center selection:bg-zinc-100
    dark:selection:bg-slate-300
    dark:selection:text-slate-900"
        >
          <div className="flex h-auto max-h-[500px] w-full flex-col justify-between space-y-4 overflow-hidden rounded-md bg-zinc-400 px-6 py-4 dark:bg-slate-800">
            <h2 className="font-details text-2xl font-black tracking-wider">
              Board
            </h2>
            <div className="flex h-auto max-h-[460px] w-full items-start justify-center space-x-6 overflow-hidden">
              {categories.map((category) => {
                return (
                  <Droppable key={category.id} droppableId={category.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="max-h-[420px] w-full overflow-y-auto rounded bg-zinc-500 py-4 text-center dark:bg-slate-900"
                        key={category.id}
                      >
                        <span className="text-lg font-bold">
                          {category.name}
                        </span>
                        <div className="w-full overflow-hidden rounded px-6 pb-4">
                          <div>
                            {category.tasks.map((task: Tasks, index) => {
                              return (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging
                                          ? "0.5"
                                          : "1",
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
              })}
            </div>
          </div>
        </section>
      </DragDropContext>
    </div>
  );
}

export default Home;
