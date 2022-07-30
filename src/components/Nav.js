import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
export default function Nav() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} key="home" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} key="about" to="/about">About</Link>
        </li>
      </ul>
      <Link className={`btn btn-primary mx-1 ${location.pathname === '/login' ? 'active' : ''}`} to="/login" role="button">Login</Link>
      <button className={`btn btn-primary mx-1}`} type="button" onClick={handleLogout}>Logout</button>
      <Link className={`btn btn-primary mx-1 ${location.pathname === '/register' ? 'active' : ''}`} to="/register" role="button">Register</Link>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
