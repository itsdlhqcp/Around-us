import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import axios from "axios";
import "./News.css";
import { InfinitySpin } from "react-loader-spinner";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loader, setLoader] = useState(true);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
              ///here with respect to value we chose from nav bar fetch and render specified data
              //asynchronous fuction implimented in above code to sort error
  // useEffect(() => {
  //   axios
  //     .get(`https://inshorts.deta.dev/news?category=${props.category}`)
  //     .then((response) => {
  //       setLoader(false);
  //       setArticles(response.data.data);
  //     });
  // }, );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://inshorts.deta.dev/news?category=${props.category}`);
        // const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=492910a2d3eb4024a0d2c79dda65d0a6`);
        setLoader(false);
        setArticles(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.category]);
  
  return (
    <div >
      {
      loader ? (
        <div className="myloader"> <InfinitySpin width="200" color="#000" /></div>
      ) : (
        <div className="container my-3" style={{ margin: "1px 0px" }}>
          <span class="small-orange-double-underline">
          <h2 className="text-center " style={{ margin: "66px 0px 0px 0px"  }}>
            News - Top {capitalizeFirstLetter(props.category)} Headlines
          </h2>
          </span>
          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    key={v4()}
                    title={element.title}
                    description={element.content}
                    imageUrl={element.imageUrl}
                    redMore={element.readMoreUrl}
                    source={element.source}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between"></div>
        </div>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;



/// https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=492910a2d3eb4024a0d2c79dda65d0a6