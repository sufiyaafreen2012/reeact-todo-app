import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { login, logout } from './redux/authSlice';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId); // Added to display user ID
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4"> Welcome to TaskMaster! </h1>
        <button
          className="btn btn-success"
          onClick={() => dispatch(login())}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Plan Your Day with TaskMaster!</h1>
      <p className="text-center text-muted">User ID: {userId}</p> {/* Added to show user ID */}
      <TaskInput />
      <TaskList />
      <button
        className="btn btn-danger"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
}

export default App;