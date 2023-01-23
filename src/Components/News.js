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

  useEffect(() => {
    axios
      .get(`https://inshorts.deta.dev/news?category=${props.category}`)
      .then((response) => {
        setLoader(false);
        setArticles(response.data.data);
      });
  }, []);

  return (
    <div >
      {
      loader ? (
        <div className="myloader"> <InfinitySpin width="200" color="#000" /></div>
      ) : (
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            News - Top {capitalizeFirstLetter(props.category)} Headlines
          </h1>
          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    key={v4()}
                    title={element.title}
                    description={element.content}
                    imageUrl={element.imageUrl}
                    newsUrl={element.url}
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
