import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import type { Entry } from "../types";
import mockEntries from "../mock";
import SearchBar from "./SearchBar";

interface ColumnData {
  id: "Backlog" | "Playing" | "Completed";
  title: string;
  entries: Entry[];
}

// Initialize columns with mock data
const initialColumns: ColumnData[] = [
  {
    id: "Backlog",
    title: "Backlog",
    entries: mockEntries.filter((e) => e.status === "Backlog"),
  },
  {
    id: "Playing",
    title: "Playing",
    entries: mockEntries.filter((e) => e.status === "Playing"),
  },
  {
    id: "Completed",
    title: "Completed",
    entries: mockEntries.filter((e) => e.status === "Completed"),
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColIndex = columns.findIndex(
      (c) => c.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (c) => c.id === destination.droppableId
    );
    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const newSourceEntries = Array.from(sourceCol.entries);
    const [movedEntry] = newSourceEntries.splice(source.index, 1);

    if (sourceCol.id === destCol.id) {
      // reorder within same column
      newSourceEntries.splice(destination.index, 0, movedEntry);
      const newColumns = [...columns];
      newColumns[sourceColIndex].entries = newSourceEntries;
      setColumns(newColumns);
    } else {
      const newDestEntries = Array.from(destCol.entries);
      newDestEntries.splice(destination.index, 0, movedEntry);

      movedEntry.status = destCol.id;

      const newColumns = [...columns];
      newColumns[sourceColIndex].entries = newSourceEntries;
      newColumns[destColIndex].entries = newDestEntries;
      setColumns(newColumns);
    }
  };

  return (
    <>
      <SearchBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            minHeight: "400px",
          }}
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              entries={column.entries}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
