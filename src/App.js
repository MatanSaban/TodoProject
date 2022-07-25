import { useEffect, useState } from "react";
import Users from "./components/Users";
import axios from "axios";
import "./app.css";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);

  const [textSearch, setTextSearch] = useState("");

  const [addUser, setAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    company: { name: "", address: "", city: "" },
  });

  useEffect(() => {
    const getUsers = async () => {
      const usersObjects = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      const theUsersData = usersObjects.data;
      let count = 0;
      if (count === 0) {
        theUsersData.map(async (user) => {
          setUsers((users) => [
            ...users,
            { ...user, posts: [], todos: [] },
          ]);
        });
      }
      count++;
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const usersPosts = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const theUsersPosts = usersPosts.data;
      setPosts(theUsersPosts);
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      const usersTodos = await axios.get(
        `https://jsonplaceholder.typicode.com/todos`
      );
      const theUsersTodos = usersTodos.data;
      setTodos(theUsersTodos);
    };
    getTodos();
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value;
    setTextSearch(text);
  };

  const handleUserChanges = (userObject) => {
    users.map((user) => {
      if (user.id === userObject.id) {
        setUsers(
          (users) => [...users],
          [(users[user.id - 1] = userObject)]
        );
      }
    });
  };

  const handleUserDelete = (e, index) => {
    setUsers([
      ...users.slice(0, index),
      ...users.slice(index + 1, users.length),
    ]);
  };

  const getNewTodo = (newTodo) => {
    let newTodos = [...todos];
    newTodos.push(newTodo);
    setTodos((todos) => newTodos);
  };
  const getNewPost = (newPost) => {
    let newPosts = [...posts];
    newPosts.push(newPost);
    setPosts((posts) => newPosts);
  };

  useEffect(() => { }, [textSearch]);

  const checkTodosStatus = (bool, index) => {
    let newTodos = todos;
    newTodos[index].completed = bool;
    console.log(newTodos);
    setTodos((todos) => [...todos], [newTodos]);
  };

  const addNewUser = () => {
    const newUsersArr = [...users];
    newUsersArr.push(newUser);
    setUsers(newUsersArr);
    setAddUser(!addUser);
  };

  const handleNewUser = () => {
    setAddUser(!addUser);
  };

  const insertNewUser = (value, field, parent = "") => {
    if (parent === "") {
      setNewUser({ ...newUser, [field]: value, id: users.length + 1 });
    } else if (parent === "address" || parent === "company") {
      setNewUser({
        ...newUser,
        [parent]: { ...newUser[parent], [field]: value },
      });
    }
  };

  return (
    <div className="app">
      <div className="usersListWrapper">
        <div className="searchWrapper">
          <label htmlFor="searchBox">Search</label>
          <input
            type="text"
            name="searchBox"
            id="searchBox"
            onChange={handleSearch}
          />
          <button onClick={handleNewUser}>Add User</button>
        </div>
        {!addUser ? (
          <Users
            usersList={users}
            posts={posts}
            todos={todos}
            textSearch={textSearch}
            checkTodosStatus={checkTodosStatus}
            handleUserChanges={handleUserChanges}
            handleUserDelete={handleUserDelete}
            getNewTodo={getNewTodo}
            getNewPost={getNewPost}
          />
        ) : (
          <div className="formSections" style={{ display: "flex", flexDirection: "column" }}>
            <h3>General:</h3>
            {Object.keys(newUser).map((field, index) => {
              if (field === "company" || field === "address") {
                return (
                  <div className="formWrapper" key={index}>
                    <h3>{field}:</h3>
                    {Object.keys(newUser[field]).map(
                      (keyName, index) => {
                        return (
                          <div className="inputWrapper" key={index}>
                            {keyName}
                            <input
                              type="text"
                              name={keyName}
                              id={keyName}
                              onChange={(e) =>
                                insertNewUser(
                                  e.target.value,
                                  e.target.name,
                                  field
                                )
                              }
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              } else if (
                field !== "id" &&
                field !== "company" &&
                field !== "address"
              ) {
                return (
                  <div className="inputWrapper" key={index}>
                    {field}
                    <input
                      type="text"
                      name={field}
                      id={field}
                      onChange={(e) =>
                        insertNewUser(
                          e.target.value,
                          e.target.name
                        )
                      }
                    />
                  </div>
                );
              }
            })}

            <button onClick={addNewUser}>Add New User</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
