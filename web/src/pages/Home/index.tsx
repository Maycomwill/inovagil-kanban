import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import Loading from "../../components/Loading";

import { useCategories } from "../../hooks/useCategories";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Category } from "../../interfaces/Categories";
import { useTasks } from "../../hooks/useTasks";
import Header from "../../components/Header";
import Board from "../../components/DroppableZones/Board";
import TrashCan from "../../components/DroppableZones/TrashCan";

function Home() {
  const { getUserData, data } = useUser();
  const { getCategories, categories, isLoading } = useCategories();
  const { patchTask, deleteTask } = useTasks();
  const id = localStorage.getItem("userData");

  useEffect(() => {
    getUserData();
    if (id !== null) {
      getCategories(id);
    }
  }, []);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    console.log(result);
    const { destination, source, draggableId } = result;
    if (destination.droppableId === source.droppableId) return;
    if (!categories) return;
    if (destination.droppableId === "trash-can-droppable-zone") {
      const sourceColIndex = categories.findIndex(
        (category: Category) => category.id === source.droppableId,
      );
      const sourceCol = categories[sourceColIndex];
      const sourceTask = [...sourceCol.tasks];
      sourceTask.splice(source.index, 1);
      categories[sourceColIndex].tasks = sourceTask;
      deleteTask(draggableId);
      return;
    }
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
          className="z-1 absolute top-20 flex w-[80%] max-w-[80%] flex-col items-center justify-center overflow-x-auto text-center
    selection:bg-zinc-100
    dark:selection:bg-slate-300 dark:selection:text-slate-900"
        >
          <div className="flex h-auto max-h-[500px] w-full flex-col justify-between space-y-4 overflow-hidden rounded-md bg-zinc-400 px-6 py-4 dark:bg-slate-800">
            <h2 className="font-details text-2xl font-black tracking-wider">
              Board
            </h2>
            <div className="flex h-auto max-h-[460px] w-full items-start justify-evenly space-x-6 overflow-hidden">
              {isLoading ? (
                <Loading />
              ) : (
                categories.map((category) => {
                  return <Board key={category.id} category={category} />;
                })
              )}
            </div>
          </div>
        </section>
        <TrashCan />
      </DragDropContext>
    </div>
  );
}

export default Home;
