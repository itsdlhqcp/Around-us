// import React from 'react';

// function ShareButton(props) {
//   const handleClick = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: props.title,
//         text: props.text,
//         url: props.url,
//       })
//       .then(() => console.log('Link shared successfully.'))
//       .catch((error) => console.log('Error sharing link:', error));
//     } else {
//       console.log('Web Share API not supported.');
//     }
//   }

//   return (
//     <button className="btn btn-outline-primary" onClick={handleClick}>
//       Share Link
//     </button>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isCollapsed, setIsCollapsed] = useState
// // Keep track of the previous and current scroll positions
// const [prevScrollPos, setPrevScrollPos] = useState(0);
// const [currentScrollPos, setCurrentScrollPos] = useState(0);

// // Update the current scroll position on scroll
// const handleScroll = () => {
// setPrevScrollPos(currentScrollPos);
// setCurrentScrollPos(window.pageYOffset);
// };

// useEffect(() => {
// window.addEventListener('scroll', handleScroll);
// return () => {
//   window.removeEventListener('scroll', handleScroll);
// };
// }, [prevScrollPos, currentScrollPos]);

// return (
// <div>
// <nav
// className={navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${ prevScrollPos < currentScrollPos && 'scroll-up' }}
// >
// <div className="container-fluid">
// <Link className="navbar-brand" to="/" onClick={handleCollapse}>
// News
// </Link>
// <button
// className="navbar-toggler"
// type="button"
// data-bs-toggle="collapse"
// data-bs-target="#navbarSupportedContent"
// aria-controls="navbarSupportedContent"
// aria-expanded="false"
// aria-label="Toggle navigation"
// onClick={() => setIsCollapsed(!isCollapsed)}
// >
// <span className="navbar-toggler-icon"></span>
// </button>
// <div
// className={collapse navbar-collapse ${isCollapsed && 'show'}}
// id="navbarSupportedContent"
// >
// <ul className="navbar-nav me-auto mb-2 mb-lg-0">
// <li className="nav-item">
// <Link
//                className="nav-link"
//                aria-current="page"
//                to="/"
//                onClick={handleCollapse}
//              >
// Home
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/business"
//                onClick={handleCollapse}
//              >
// Business
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/world"
//                onClick={handleCollapse}
//              >
// World
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/national"
//                onClick={handleCollapse}
//              >
// National
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/india"
//                onClick={handleCollapse}
//              >
// India
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/politics"
//                onClick={handleCollapse}
//              >
// Politics
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/entertainment"
//                onClick={handleCollapse}
//              >
// Entertainment
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/science"
//                onClick={handleCollapse}
//              >
// Science
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/sports"
//                onClick={handleCollapse}
//              >
// Sports
// </Link>
// </li>
// <li className="nav-item">
// <Link
//                className="nav-link"
//                to="/technology"
//                onClick={handleCollapse}
//              >
// Technology
// </Link>
// </li>
// <li className="nav-item">
// <Link
// className="nav-link"
// to="/automobile"
// onClick={







// <div key={key} className='my-3'>
      //     <div className="card" style={{width: "21rem"}}>
      //         <img src={imageUrl} className="card-img-top" alt="..." sizes="(max-height: 576px) 100vw, (max-height: 768px) 50vw, 33vw" style={{height: "17rem" ,  objectFit: "cover"}}/>
      //         <div className="card-body">
      //           <h5 className="card-title">{title}</h5>
      //           <p className="card-text">{description}</p>
      //           {/* <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date}</small></p> */}
      //           <div>
      //           <a rel="noreferrer" href={redMore} target="_balnk" className="btn btn-sm btn-dark pr-3">Read More</a>
      //           {/* <button type="button" class="btn btn-sm btn-outline-primary pr-3" style={{ marginLeft: '10px' }}><i class="fas fa-heart"></i>👍</button> */}
      //           {/* <button className="btn btn-primary btn-sm" onClick={handleDoubleTap} style={{ marginLeft: '10px' }}>
      //           Like <span className="badge badge-light">{likes}</span>
      //            </button> */}
      //            <button className="btn btn-outline-primary btn-sm" onClick={handleShare} style={{ marginLeft: '10px' }}>
      //            share
      //             </button>
      //             {/* <button className="btn btn-sm btn-secondary" onClick={handleClick} style={{ marginLeft: '10px' }}>
      //               {isMarked ? "marked" : "mark it"}
      //             </button> */}
                  
      //           </div>
      //         </div>
      //     </div>
      // </div>