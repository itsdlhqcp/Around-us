import React from 'react'

const Newsitem =(props)=>{
    let {title,description,imageUrl,newsUrl,author,date,key}=props;
    return (
      <div key={key} className='my-3'>
          <div className="card" style={{width: "18rem"}}>
              <img src={imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_balnk" className="btn btn-sm btn-dark">Read More</a>
              </div>
          </div>
      </div>
    )
  
}

export default Newsitem
