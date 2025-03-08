import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, fetchWeather } from '../redux/taskSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { id: Date.now(), text: task, priority };
      dispatch(addTask(newTask));
      if (task.toLowerCase().includes('walk')) {
        dispatch(fetchWeather(newTask.id));
      }
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
        className="form-control d-inline w-50"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="form-select d-inline w-25 mx-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
};

export default TaskInput;