import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="home">
      <div className="Home">
        <Link to="/">Home</Link>
      </div>
      <div className="Settings">
        <Link to="/Settings">Settings</Link>
      </div>
    </div>
  )
}

export default Navbar
