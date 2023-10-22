import React from 'react'
import { Link } from 'react-router-dom'
import settingsIcon from '../assets/bottombar/settings.svg';
import issueIcon from '../assets/bottombar/issue.svg';

const Navbar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',  // This will vertically center the icons
        height: '80px'  // Increased height to accommodate bigger icons
      }}
    >
      <div className="Home">
        <Link to="/Home">
          <img src={issueIcon} alt="Home" style={{ width: '40px', height: '40px' }} />
        </Link>
      </div>
      <div className="Settings">
        <Link to="/Settings">
          <img src={settingsIcon} alt="Settings" style={{ width: '40px', height: '40px' }} />
        </Link>
      </div>
    </div>
  )
}


export default Navbar
