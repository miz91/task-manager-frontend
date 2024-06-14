import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import TaskForm from './TaskForm';

const apiURL = process.env.REACT_APP_API_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get(`${apiURL}/tasks`)
      .then(response => {
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${apiURL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    setEditingTask(null);
  };

  return (
    <div>
      {tasks.map(task => (
        <Task key={task._id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
      {editingTask && (
        <TaskForm task={editingTask} onUpdateTask={handleUpdate} />
      )}
    </div>
  );
};

export default TaskList;
