import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const url = "http://localhost:8000";

function App() {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);
  const [newUserCount, setNewUserCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
 
  
  const fetchUsers = async () => {
    setFetching(true);

    let json;
    try {
      const data = await fetch(url + "/users/");
      json = await data.json();
      console.log(json);
    } catch (err) {
      console.log(err);
      window.alert(err);
    }

    if (json) {
      setUsers(json);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [newUserCount]);

  
  const addUser = async () => {
    const id = newUserCount;
    const postData = {id, name, email, phone};
    console.log(postData);

    fetch(url + "/users/add/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(postData)
    }).then(res => {
      console.log("Post response:", res);
    });
    setNewUserCount(newUserCount+1);
    setName("");
    setEmail("");
    setPhone("");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  return (
    <div className="App">
      <header className="App-header">
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users?.map((user, index) => (
              <li key={index}>{user.fields.name}</li>
            ))}
          </ul>
        )}
      </header>
      <div>
         Name:<input  id="name"  onBlur={evt => setName(evt.target.value)}></input> 
      </div>
      <div>
        Email: <input id="email" onBlur={evt => setEmail(evt.target.value)}></input> 
      </div>
      <div>
        Phone:<input id="phone" onBlur={evt => setPhone(evt.target.value)} ></input> 
      </div>
      <button className="Add-button" onClick={addUser}>Add User</button>
    </div>
  );
}

export default App;
