import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [file, setFile] = useState();

  const uploadFile = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const reqCred = {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    };

    const result = await fetch("/files", reqCred)
      .then((res) => res.json())
      .then((data) => console.log(data.id))
      .catch((err) => console.log(err));
    console.log(result);
  };

  return (
    <div>
      <h1>HACKATHON 2</h1>
      <form onSubmit={uploadFile}>
        <input
          type="file"
          accept="image/*"
          onChange={(fle) => setFile(fle.target.files[0])}
        ></input>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
