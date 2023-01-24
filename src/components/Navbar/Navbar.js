import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className=''>
      <nav className='navbar  navbar-expand-sm'>
        <div className="container">
          <Link to={'/'} className='navbar-brand '>Gestionnaire de contacts Vivi</Link>
        </div>

      </nav>
    </div>
  )
}

export default Navbar;