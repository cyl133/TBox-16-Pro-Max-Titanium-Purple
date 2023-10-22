import React from 'react'
import { Link } from 'react-router-dom'

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
        alignContent: 'center',
        height: '60px'
      }}
    >
      <div className="Home">
        <Link to="/Home">Home</Link>
      </div>
      <div className="Settings">
        <Link to="/Settings">Settings</Link>
      </div>
    </div>
  )
}

export default Navbar
