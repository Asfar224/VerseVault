import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar(props) {
  const navigate = useNavigate();

  const signingout = () => {
    props.setloginstate(false);

  }

  const handlelogin = () => {
    navigate('/login');
  }

  return (
    <>
      <nav style={{ height: '47px', backgroundColor: 'black' }} className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: 'white' }} href="#">Verse Vault</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/" 
                  style={{ color: 'white' }} 
                  activeClassName="active"
                  exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/about" 
                  style={{ color: 'white' }} 
                  activeClassName="active">
                  About
                </NavLink>
              </li>
            </ul>
            <form className="d-flex ms-auto" role="search">
              <button className="btn btn-outline-success me-2" type="button" onClick={signingout}>SIGNOUT</button>
              <button className="btn btn-outline-success" type="button" onClick={handlelogin}>LOGIN</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
