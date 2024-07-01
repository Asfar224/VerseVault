import React ,{useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import './Navbar.css';

function Navbar(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = () => {
    setIsCollapsed(true);
  };

  const signingout = () => {
    signOut(auth)
      .then(() => {
        props.setloginstate(false);
        closeNavbar();
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const handlelogin = () => {
    navigate('/login');
    closeNavbar();
  };

  return (
    <>
      <nav style={{ height: '47px', backgroundColor: 'black' }} className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: 'white' }} href="#">Verse Vault</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  style={{ color: 'white' }}
                  activeClassName="active"
                  exact
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about"
                  style={{ color: 'white' }}
                  activeClassName="active"
                  onClick={closeNavbar}
                >
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

