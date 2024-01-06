import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import LoginPopup from "../login/LoginPopup";
import SignupPopup from '../signup/SignupPopup'
import UserProfile from "../userProfile/UserProfile";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  const openLoginPopup = () => {
    setLoginOpen(true);
  };

  const openSignupPopup = () => {
    setSignupOpen(true);
  };

  const closePopup = () => {
    setLoginOpen(false);
    setSignupOpen(false);
  };

  const togglePopup = () => {
    setLoginOpen(!isLoginOpen);
    setSignupOpen(!isSignupOpen);
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout')
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>  
      {currentUser !== null &&
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Recipe App
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes color="black" /> : <FaBars color="black" />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {/*{currentUser !== null &&*/}
              <>
                <li className="nav-item">
                  <NavLink
                    to="/post-recipe"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Post a Recipe
                  </NavLink>
                </li>
                <UserProfile profileImg={currentUser.img} profileUsername={currentUser.username} logout={handleLogout} />
              </>
              {/*{currentUser === null &&*/}
            </ul>
          </div>
        </nav>
        <LoginPopup isOpen={isLoginOpen} onClose={closePopup} onToggle={togglePopup} />
        <SignupPopup isOpen={isSignupOpen} onClose={closePopup} onToggle={togglePopup} />
      </IconContext.Provider>
      }
      {currentUser === null &&
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              Recipe App
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes color="black" /> : <FaBars color="black" />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <>
                <li className="nav-item">
                  <button className='signin-btn' onClick={openLoginPopup}>Log in</button>
                </li>
                <li className="nav-item">
                  <button className='register-btn' onClick={openSignupPopup}>Sign Up</button>
                </li>
              </>
            </ul>
          </div>
        </nav>
        <LoginPopup isOpen={isLoginOpen} onClose={closePopup} onToggle={togglePopup} />
        <SignupPopup isOpen={isSignupOpen} onClose={closePopup} onToggle={togglePopup} />
      </IconContext.Provider>
      }
    </>
  );
}

export default Navbar;