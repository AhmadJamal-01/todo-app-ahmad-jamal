
"use client";
import React, { useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState(null);

  interface Task {
    title: string;
    desc: string;
  }
  
  const submitHandler = (e:any) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTasks = mainTask.map((task, index) =>
        index === editIndex ? { title , desc } : task
      );
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      setMainTask([...mainTask, {title, desc}]);
    }
    setTitle("");
    setDesc(""); 
  };

  const editHandler = (index:any) => {
    setTitle(mainTask[index].title);
    setDesc(mainTask[index].desc);
    setEditIndex(index);
  };

  const deleteHandler = (index:any) => {
    setMainTask(mainTask.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">
        My Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 m-8 px-4 py-2"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 m-8 px-4 py-2"
          placeholder="Enter Description Here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-300 text-red-500 font-bold">
        <ul>
          {mainTask.length === 0 ? (
            <h2>No Task Available</h2>
          ) : (
            mainTask.map((t, i) => (
              <li key={i} className="flex items-center justify-between mb-8">
                <div className="flex items-center justify-between w-2/3">
                  <h5 className="text-2xl font-semibold">{t.title}</h5>
                  <h6 className="text-2xl font-medium">{t.desc}</h6>
                </div>
                <button
                  onClick={() => editHandler(i)}
                  className="bg-green-600 text-white px-6 py-2 font-bold text-center rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteHandler(i)}
                  className="bg-red-600 text-white px-4 py-2 font-bold text-center rounded"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default Todo;
