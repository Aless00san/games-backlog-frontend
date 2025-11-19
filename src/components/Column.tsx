import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { Entry } from "../types";
import EntryCard from "./EntryCard";

interface ColumnProps {
  id: string; //UNIQUE ID
  title: string;
  entries: Entry[];
}

export default function Column({ id, title, entries }: ColumnProps) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#3a3a3a" : "#2b2b2b",
            borderRadius: "8px",
            minWidth: "33%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minHeight: "200px",
          }}
        >
          <h3 style={{ color: "white", margin: "0.5rem" }}>{title}</h3>
          {entries.map((entry, index) => (
            <Draggable key={entry._id} draggableId={entry._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <EntryCard entry={entry} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
