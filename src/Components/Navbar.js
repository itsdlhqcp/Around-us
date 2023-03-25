import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const Navbar=()=>{
    //component navbar is rendered here
    const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(false);                          //this function closes the navbar after a content is selected
  }; 
    return (
      <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={handleCollapse}>News</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
             aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            onClick={() => setIsCollapsed(!isCollapsed)}>
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isCollapsed && 'show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/" onClick={handleCollapse}>Home</Link>
                </li> */}
                <li className="nav-item"><Link className="nav-link" to="/voice" onClick={handleCollapse}>ASK FILTERED NEWS</Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/business" onClick={handleCollapse}>Business</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/world" onClick={handleCollapse}>World</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/national" onClick={handleCollapse}>National</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/india" onClick={handleCollapse}>India</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/politics" onClick={handleCollapse}>Politics</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entertainment" onClick={handleCollapse}>Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/science" onClick={handleCollapse}>Science</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sports" onClick={handleCollapse}>Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/technology" onClick={handleCollapse}>Technology</Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/automobile" onClick={handleCollapse}>Automobile</Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/startup" onClick={handleCollapse}>StartUp</Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/miscellaneous" onClick={handleCollapse}>Miscellaneous</Link></li>
                         
            </ul>
            </div>
        </div>
        </nav>
      </div>
    )
  
}

export default Navbar
