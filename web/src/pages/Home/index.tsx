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
import AddBtn from "../../components/PopOver/AddBtn";

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
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-y-auto">
      <Header user={data} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section
          className="z-1 absolute top-24 flex w-[85%] max-w-[85%] flex-col items-center justify-center overflow-x-auto text-center selection:bg-zinc-100 dark:selection:bg-slate-300 dark:selection:text-slate-900"
        >
          <div className="mb-6 flex h-auto min-h-[420] w-full flex-col justify-start space-y-4 overflow-hidden rounded-md bg-zinc-400 px-6 py-4 dark:bg-slate-800">
            <h2 className="font-details text-2xl font-black tracking-wider">
              Board
            </h2>
            <div className="flex w-full flex-col space-y-4 md:grid md:grid-cols-3 md:gap-2 md:space-y-0 px-0">
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
      <AddBtn />
    </div>
  );
}

export default Home;
