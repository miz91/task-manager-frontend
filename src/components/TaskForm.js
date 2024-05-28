// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask, task, onUpdateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, completed: false };

    if (task) {
      axios.put(`http://localhost:5000/api/tasks/${task._id}`, newTask)
        .then(response => {
          onUpdateTask(response.data);
        })
        .catch(error => console.error('There was an error updating the task!', error));
    } else {
      axios.post('http://localhost:5000/api/tasks', newTask)
        .then(response => {
          console.log('Task added:', response.data);
          setTitle('');
          setDescription('');
          onAddTask(response.data);
        })
        .catch(error => console.error('There was an error creating the task!', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
