import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTaskCompletion, fetchWeather } from '../redux/taskSlice';

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const weather = useSelector((state) => state.tasks.weather);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    dispatch(fetchWeather('Bengaluru,IN'));
    const interval = setInterval(() => {
      if (status === 'failed') {
        dispatch(fetchWeather('Bengaluru,IN'));
      }
    }, 5000);
    const timeout = setTimeout(() => clearInterval(interval), 30000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
    setEditPriority(task.priority);
  };

  const handleSaveEdit = (id) => {
    dispatch(editTask({ id, text: editText, priority: editPriority }));
    setEditingTask(null);
  };

  const handleToggleCompletion = (id) => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleTouchStart = (e, task) => {
    setTouchStart(Date.now());
  };

  const handleTouchEnd = (e, task) => {
    if (Date.now() - touchStart > 500) {
      handleEdit(task);
    }
  };

  return (
    <>
      {status === 'failed' && weather === null && (
        <div className="text-center mb-3 text-danger">
          Failed to fetch weather: {error || 'Unknown error'} (Retrying...)
        </div>
      )}
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            {editingTask === task.id ? (
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control me-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <select
                  className="form-select me-2"
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleSaveEdit(task.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => handleToggleCompletion(task.id)}
                  className="me-2"
                />
                <span
                  className={`priority-${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`}
                  onDoubleClick={() => handleEdit(task)}
                  onTouchStart={(e) => handleTouchStart(e, task)}
                  onTouchEnd={(e) => handleTouchEnd(e, task)}
                >
                  {task.text} ({task.priority})
                  {task.text.toLowerCase().includes('out') && weather !== null
                    ? ` - ${weather >= 0 ? weather.toFixed(1) : 'N/A'}°C`
                    : ''}
                </span>
                <div className="button-group">
                  <button
                    className="btn btn-primary btn-sm edit-btn"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;