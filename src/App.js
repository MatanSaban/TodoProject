import { useEffect, useState } from "react";
import UserDataComp from "./components/UserDataComp";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [todos, setTodos] = useState([]);

    const [usersPosts, setUsersPosts] = useState([])
    
    const [usersFullData, setUsersFullData] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          const usersObjects = await axios.get(`https://jsonplaceholder.typicode.com/users`);
          const theUsersData = usersObjects.data;
          theUsersData.map(async (user) => {
            setUsers(users => [...users, {...user, posts:[], todos:[]} ]);  
          })
        } 
        getUsers();
      }, []);

    useEffect(() => {
        const getPosts = async () => {
          const usersPosts = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
          const theUsersPosts = usersPosts.data;
            setPosts(theUsersPosts);  
        } 
        getPosts();
      }, []);

    useEffect(() => {
        const getTodos = async () => {
          const usersTodos = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
          const theUsersTodos = usersTodos.data;
            setTodos(theUsersTodos);  
        } 
        getTodos();
      }, []);

      const getPosts = (id) => {
        const postsArray = []
        posts.map((post) => {
          // console.log(post.userId);
          if (id === post.userId) {
            return postsArray.push(post)
            // console.log(true);
          }
        })
        return postsArray;
      }

      const getTodos = (id) => {
        const todosArray = []
        todos.map((todo) => {
          // console.log(post.userId);
          if (id === todo.userId) {
            return todosArray.push(todo)
            // console.log(true);
          }
        })
        return todosArray;
      }

    return (
        <div className="App">
          {
            users.map((user, index) => {
              return <UserDataComp key={index} user={user} id={user.id} posts={getPosts(user.id)} todos={getTodos(user.id)} />
            })
          }
        </div>
    );
}

export default App;
