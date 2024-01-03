import { useState } from 'react';
import './LoginPopup.css';
import newRequest from '../../utils/newRequest.js';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ isOpen, onClose, onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post('/auth/login', {
        username,
        password
      })
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      onClose();
      navigate("/");
    } catch (err) {
      setLoginError(err.response.data);
    }
  }

  return isOpen ? (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          X
        </span>
        <h2>Log in to Recipe App</h2>
        <form onSubmit={handleLogin}>
          <label>Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className='sign-up'>Log in</button>
        </form>
        {loginError && <p className="error-message">{loginError}</p>}
        <p>
          Don't have an account? <button onClick={onToggle} className="no-account-btn">Sign up</button>
        </p>
      </div>
    </div>
  ) : null;
};

export default LoginPopup;