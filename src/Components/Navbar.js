import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import "./News.css"
import LanguageSwitch from './LanguageSwitch';



const Navbar=()=>{
    //component navbar is rendered here
    const [isCollapsed, setIsCollapsed] = useState(false);
     
    const location = useLocation();

    const handleCollapse = () => {
        setIsCollapsed(false);       //this function closes the navbar after a content is selected
    }; 

    const handleTimeout = () => {
        setTimeout(() => {
            setIsCollapsed(false);
        }, 11000);
    }

    // add event listener to document object to listen for click events
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.navbar') === null) {
                setIsCollapsed(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        const handlePopState = () => {
            setIsCollapsed(false); // close navbar on back button press
        }

        window.addEventListener('popstate', handlePopState);

        // clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsCollapsed(false); // close navbar on location change
    }, [location]);

   
  
      

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
                <div className="container-fluid">
                
                <button 
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                        onClick={() => {
                            setIsCollapsed(!isCollapsed);
                            handleTimeout();
                        }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/" onClick={handleCollapse}>TopNews</Link>
                    
                    <LanguageSwitch/>
                    
            <div className={`collapse navbar-collapse ${isCollapsed && 'show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/" onClick={handleCollapse}>Home</Link>
                </li> */}
                <li className="nav-item"><Link className="nav-link" to="/gpt" onClick={handleCollapse}><span style={{ color: 'green', fontWeight: 'bold', fontStyle: 'italic' }}>&lt;--TRY GPT VOICE AI--&gt;</span></Link></li>
                <li className="nav-item"><Link className="nav-link" to="/voice" onClick={handleCollapse}><span style={{ color: '#ADD8E6', fontWeight: 'bold' }}>ASK FILTERED NEWS</span></Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/world" onClick={handleCollapse}>World</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/india" onClick={handleCollapse}>India</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/national" onClick={handleCollapse}>National</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/politics" onClick={handleCollapse}>Politics</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/business" onClick={handleCollapse}>Business</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sports" onClick={handleCollapse}>Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/science" onClick={handleCollapse}>Science</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/technology" onClick={handleCollapse}>Technology</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/automobile" onClick={handleCollapse}>Automobile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entertainment" onClick={handleCollapse}>Entertainment</Link></li> 
                <li className="nav-item"><Link className="nav-link" to="/startup" onClick={handleCollapse}>StartUp</Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/miscellaneous" onClick={handleCollapse}>Miscellaneous</Link></li>  
                <li className="nav-item"><Link className="nav-link" to="/about" onClick={handleCollapse}>About Us</Link></li>            
            </ul>
            </div>
        </div>
        </nav>
      </div>
    )
  
}

export default Navbar
