import { Trash2 } from "lucide-react";
import { Droppable } from "react-beautiful-dnd";
function TrashCan() {
  return (
    <Droppable droppableId="trash-can-droppable-zone">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="z-100 absolute bottom-4 right-10 p-2 text-red-600 hover:text-red-500"
        >
          <Trash2 size={32} />
        </div>
      )}
    </Droppable>
  );
}

export default TrashCan;
