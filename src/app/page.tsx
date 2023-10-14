"use client"
import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);
  const [datetime, setDateTime] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Initialize as -1 to indicate no task is being edited

  // Define an array of background colors for tasks
  const taskBackgroundColors = ['#d3e3fa', '#b5c5dc'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      // If an index is set, update the task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text, desc, datetime };
      setTasks(updatedTasks);
      setEditIndex(-1); // Reset the editIndex
    } else {
      // Otherwise, add a new task
      setTasks([...tasks, { text, desc, datetime }]);
    }
    setText('');
    setDesc('');
    setDateTime('');
  }

  const editTask = (index) => {
    // Set the editIndex to the index of the task to be edited
    setEditIndex(index);
    const taskToEdit = tasks[index];
    setText(taskToEdit.text);
    setDesc(taskToEdit.desc);
    setDateTime(taskToEdit.datetime);
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditIndex(-1); // Reset the editIndex when deleting a task
  }
  
  const renderTasks = tasks.map((task, i) => {
    const backgroundColor = taskBackgroundColors[i % taskBackgroundColors.length];
    const isBeingEdited = i === editIndex;

    return (
      <div key={i} style={{ margin: '10px', display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
        <div className="py-4 px-6 rounded-lg border shadow-md" style={{ backgroundColor}}>
          <div>
            {isBeingEdited ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter Task Here"
                  className="custom-input"
                />
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter Description Here"
                  className="custom-input"
                />
                <input
                  id="party"
                  type="date"
                  name="partydate"
                  value={datetime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="custom-input"
                />
                <button type="submit" className='bg-slate-400 text-black px-5 py-3 mx-5 my-3 rounded-lg'>Save</button>
              </form>
            ) : (
              <>
                <h1 className='pt-2 text-xl font-bold text-gray-900'>{task.text}</h1>
                <h1 className='pt-2 text-base text-gray-700'>{task.datetime}</h1>
              </>
            )}
          </div>
          <div className='py-5'>
            {isBeingEdited ? null : (
              <button onClick={() => editTask(i)} className='bg-slate-400 text-black px-5 py-3 my-3 rounded-lg'>Edit</button>
            )}
            <button onClick={() => deleteTask(i)} className='bg-slate-400 text-black px-5 py-3 mx-5 my-3 rounded-lg'>Delete</button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="bg-slate-900">
        <h1 className="text-white text-center py-5 px-5 text-3xl">To-Do App</h1>
      </div>

      <form className="flex justify-center px-6" onSubmit={handleSubmit}>
        <div className="px-5 py-5">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Task Here"
            className="bg-slate-300 text-slate-800 py-3 px-2 rounded-lg items-center custom-input"
          />
        </div>

        <div className="px-5 py-5">
          <input
            id="party"
            type="date"
            name="partydate"
            value={datetime}
            onChange={(e) => setDateTime(e.target.value)}
            className='bg-slate-300 text-slate-800 px-3 py-3 rounded-lg custom-input'
          />
        </div>

        <div className="py-5">
          <button className="rounded bg-gray-600 text-white py-3 px-5">
            Add
          </button>
        </div>

        <hr />
      </form>

      <div className="py-3 px-10">
        <ul style={{ marginTop: "10px" }}>
          <li className=' rounded  text-gray-800'>
            {renderTasks}
          </li>
        </ul>
      </div>
    </>
  );
}

