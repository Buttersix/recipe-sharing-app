import { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ profileImg, profileUsername, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="user-profile" onClick={toggleMenu}>
      <div className="profile-image">
        <img
          src={profileImg || "profile.jpg"}
          alt=""
          width="44"
          height="44"
        />
      </div>
      <div className="profile-username">
        {profileUsername}
      </div>
      {isMenuOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-ul">
            <li className="dropdown-li">Profile</li>
            <li className="dropdown-li">Notifications</li>
            <li className="dropdown-li">Settings</li>
            <li className="dropdown-li" onClick={logout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;