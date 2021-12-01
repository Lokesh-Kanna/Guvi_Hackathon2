import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drive" element={<SecondPage />} />
        <Route path="/users/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to L-drive</h1>
      <button onClick={() => navigate("/users/signup")}>Sign Up</button>
    </div>
  );
}

function SecondPage() {
  const [file, setFile] = useState();
  const [fileDisp, setFileDisp] = useState([]);

  useEffect(() => {
    fetch("https://l-cloud-drive.herokuapp.com/files")
      .then((data) => data.json())
      .then((res) => setFileDisp(res));
  }, []);

  const uploadFile = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const reqCred = {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    };

    const result = await fetch(
      "https://l-cloud-drive.herokuapp.com/files",
      reqCred
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
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
      <div>
        {fileDisp.map((file) => {
          return <FileDisplay name={file.fileName} path={file.path} />;
        })}
      </div>
    </div>
  );
}

function FileDisplay({ name, path }) {
  return (
    <div>
      <div class="card" style={{ width: 500 }}>
        <div class="card-body">
          <h5 class="card-title">FileName: {name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">FilePath: {path}</h6>
        </div>
      </div>
    </div>
  );
}

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const addUser = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", email);
    formData.append("password", password);

    const reqCred = {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    };

    const result = await fetch(
      "https://l-cloud-drive.herokuapp.com/users/signup",
      reqCred
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    console.log(result);
  };
  return (
    <div>
      <form onSubmit={addUser}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="pasword"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default App;
