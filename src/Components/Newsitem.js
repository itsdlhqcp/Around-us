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
  const [isMarked, setIsMarked] = useState(false);   //marked for later referance
  const handleClick = () => {
    setIsMarked(!isMarked);
  }

  const handleShare = () => {      //it handle share at web view not in android
  if (navigator.share) {
    navigator.share({
      title: props.title,
      text: props.description,
      url: props.redMore,
    })
    .then(() => console.log('Link shared successfully.'))
    .catch((error) => console.log('Error sharing link:', error));
  } else {
    console.log('Web Share API not supported.');
  }
}
    let {title,description,imageUrl,key,redMore}=props;    //newsUrl,author,date,readMoreUrl
    return (
      <div key={key} className='my-3'>
          <div className="card" style={{width: "21rem"}}>
              <img src={imageUrl} className="card-img-top" alt="..." sizes="(max-height: 576px) 100vw, (max-height: 768px) 50vw, 33vw" style={{height: "17rem" ,  objectFit: "cover"}}/>
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
                 <button className="btn btn-outline-primary btn-sm" onClick={handleShare} style={{ marginLeft: '10px' }}>
                 share
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={handleClick} style={{ marginLeft: '10px' }}>
                    {isMarked ? "marked" : "mark it"}
                  </button>
                  
                </div>
              </div>
          </div>
      </div>
    )
  
}

export default Newsitem
