import "./App.css";
import KanbanBoard from "./KanbanBoard";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1e1e1e",
        padding: "1rem",
      }}
    >
      <KanbanBoard />
    </div>
  );
}

export default App;
