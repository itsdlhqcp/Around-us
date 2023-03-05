import React, { useState } from 'react'

const Newsitem =(props)=>{

    const [likes, setLikes] = useState(0);   ///sets initial coumts of likes to be zero
    const handleDoubleTap = () => {
      setLikes(likes + 1);
    }
  
    // let lastTap = 0;
    // const handleTap = () => {
    //   const now = Date.now();
    //   const DOUBLE_TAP_DELAY = 300; // in milliseconds
    //   if (now - lastTap <= DOUBLE_TAP_DELAY) {
    //     handleDoubleTap();
    //   }
    //   lastTap = now;
    // }

    // function ReadLaterButton() {
  const [isMarked, setIsMarked] = useState(false);
  const handleClick = () => {
    setIsMarked(!isMarked);
  }

    let {title,description,imageUrl,key,redMore}=props;    //newsUrl,author,date,readMoreUrl
    return (
      <div key={key} className='my-3'>
          <div className="card" style={{width: "21rem"}}>
              <img src={imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                {/* <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date}</small></p> */}
                <div>
                <a rel="noreferrer" href={redMore} target="_balnk" className="btn btn-sm btn-dark pr-3">Read More</a>
                {/* <button type="button" class="btn btn-sm btn-outline-primary pr-3" style={{ marginLeft: '10px' }}><i class="fas fa-heart"></i>👍</button> */}
                <button className="btn btn-primary btn-sm" onClick={handleDoubleTap} style={{ marginLeft: '10px' }}>
                Like <span className="badge badge-light">{likes}</span>
                 </button>
                  <button className="btn-sm" onClick={handleClick} style={{ marginLeft: '73px' }}>
                    {isMarked ? "marked" : "✔"}
                  </button>
                </div>
              </div>
          </div>
      </div>
    )
  

}

export default Newsitem
