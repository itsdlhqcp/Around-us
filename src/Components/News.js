import React, {useState,useEffect} from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'


const News =(props)=>{
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
   const updateNews= async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=be426625a6e24ece86712c32b3b3caf9&page=1&pagesize=20`
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
   }


  useEffect(() => {
     updateNews();
  }, [])
  
  

  const handlePrevclick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=be426625a6e24ece86712c32b3b3caf9&page=${page-1}&pagesize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setPage(setPage-1);
    setArticles(parsedData.articles);
    
  }

  const handleNextclick= async ()=>{
    if(page+1>Math.ceil(totalResults/20)){
      alert("No more pages");
    }
     else{ 
      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=be426625a6e24ece86712c32b3b3caf9&page=${page+1}&pagesize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      setPage(setPage+1);
      setArticles(parsedData.articles);
     }
  }

  


      return (

        <div className = "container my-3">
          <h1 className="text-center" style={{margin:'35px 0px'}}>News - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          <div className="row"> 
          {articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>    
                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                   </div>
          })}
        </div>
            <div className="container d-flex justify-content-between">
                  <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevclick}> &larr; Prev</button>
                  <button disabled={page+1>Math.ceil(totalResults/20)}type="button" className="btn btn-dark" onClick={handleNextclick}>Next &rarr;</button>  
            </div>

      </div>
    )

}

News.defaultProps = {
  country: 'in',
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News
