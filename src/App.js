import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h1>HACKATHON 2</h1>;
}

export default App;
