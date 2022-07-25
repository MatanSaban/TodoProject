import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import SingleTodo from "./SingleTodo";

const UserTodos = (props) => {
  const [addTodo, setAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({
    completed: false,
    id: props.id,
    title: "",
    userId: props.id,
  });
  useEffect(() => { }, [addTodo]);

  const handleNewTodo = (title) => {
    setNewTodo({
      ...newTodo,
      title: title,
      id: props.id,
      userId: props.id,
    });
  };

  const sendNewTodo = () => {
    props.getNewTodo(newTodo);
    setAddTodo(false);
    console.log("work");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h3>Todos - User {props.id}</h3>
        <button onClick={() => setAddTodo(!addTodo)}>New Todo</button>
      </div>
      {!addTodo ? (
        props.children.map((todo, index) => {
          if (todo.userId === props.id) {
            // console.log('yesss');
            return (
              <SingleTodo
                key={index}
                realIndex={index}
                title={todo.title}
                completed={todo.completed}
                checkTodosStatus={props.checkTodosStatus}
              />
            );
          } else {
            return null;
          }
        })
      ) : (
        <AddTodo handleNewTodo={handleNewTodo} setAddTodo={setAddTodo} sendNewTodo={sendNewTodo}/>
      )}
    </div>
  );
};

export default UserTodos;
