import { Home } from "./pages/home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      className="App d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
