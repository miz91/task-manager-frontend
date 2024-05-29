import React, { useEffect, useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm'; 
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then(response => {
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
      })
      .catch(error => console.error('There was an error fetching the tasks!', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('There was an error deleting the task!', error));
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
