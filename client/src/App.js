// import logo from "./logo.svg";
// import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [users, setUsers] = useState([]);
//   // Axios untuk mengambil data dari server via HTTP.
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/users")
//       .then((res) => {
//         setUsers(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="App">
//       <h2>Daftar Users</h2>
//       <ul style={{ listStyle: "none" }}>
//         {users.map((user) => (
//           <li key={user.id}>{user.nama}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <h1>POLIMDO Dashboard</h1>
      <UserList />
    </div>
  );
}

export default App;
