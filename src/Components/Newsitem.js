import React from 'react'

const Newsitem =(props)=>{

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
    let {title,description,imageUrl,key,redMore,date}=props;    //newsUrl,author,date,readMoreUrl
    return (
      <div key={key} className='my-3'>
          <div className="card" style={{width: "21rem"}}>
              <img src={imageUrl} className="card-img-top" alt="..." sizes="(max-height: 576px) 100vw, (max-height: 768px) 50vw, 33vw" style={{height: "17rem" ,  objectFit: "cover"}}/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">{date}</small></p>
                <div>
                <a rel="noreferrer" href={redMore} target="_balnk" className="btn btn-sm btn-dark pr-3">Read More</a>
                 <button className="btn btn-outline-primary btn-sm" onClick={handleShare} style={{ marginLeft: '10px' }}>
                 share
                  </button>
                </div>
              </div>
          </div>
      </div>
    )
  
}

export default Newsitem
