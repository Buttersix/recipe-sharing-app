import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js';
import './SignupPopup.css';

const SignupPopup = ({ isOpen, onClose, onToggle }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post('/auth/register', {
        email,
        username,
        password
      })
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      onClose();
      navigate("/");
    } catch (err) {
      setSignupError(err.response.data);
    }
  };

  return isOpen ? (
    <div className="popup">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          X
        </span>
        <h2>Sign Up for Recipe App</h2>
        <form onSubmit={handleSignup}>
          <label>Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className="sign-up">Sign up</button>
        </form>
        {signupError && <p className="error-message">{signupError}</p>}
        <p>
          Already have an account? <button onClick={onToggle} className="no-account-btn">Log in</button>
        </p>
      </div>
    </div>
  ) : null;
};

export default SignupPopup;