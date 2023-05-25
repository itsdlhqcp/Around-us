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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const keyword = searchKeyword.toLowerCase();
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(keyword) ||
        article.content.toLowerCase().includes(keyword) 
    );
    setFilteredArticles(filtered);
  }, [searchKeyword, articles]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchIconClick = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cachedData = localStorage.getItem(`${props.category}_news`);
        if (cachedData) {
          // Data is present in local storage
          const parsedData = JSON.parse(cachedData);
          const timestamp = parsedData.timestamp;
          const data = parsedData.data;

          if (Date.now() - timestamp <= 1800000) {
            // Data is fresh (less than or equal to 30 minutes old)
            setArticles(data);
            setLoader(false);
            return;
          } else {
            // Data is stale (more than 30 minutes old)
            localStorage.removeItem(`${props.category}_news`);
          }
        }

        // Fetch data from API
        const response = await axios.get(`https://inshorts.deta.dev/news?category=${props.category}`);
        // const response = await axios.get(`https://inshorts.deta.dev/news?category=${props.category}`);
        setLoader(false);
        setArticles(response.data.data);

        // Save data to local storage
        localStorage.setItem(
          `${props.category}_news`,
          JSON.stringify({
            timestamp: Date.now(),
            data: response.data.data,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.category]);

  return (
    <div>
      {loader ? (
        <div className="myloader">
          <InfinitySpin width="200" color="#000" />
        </div>
      ) : (
        <div
          className="container my-3"
          style={{ margin: "0px 1px" }}
        >
          <span class="small-orange-double-underline">
            <h2
              className="text-center "
              style={{ margin: "0px 0px 7px 0px" }}
            >
              News - Top{" "}
              {capitalizeFirstLetter(props.category)} Headlines --
              <span
              className="search-icon"
              onClick={handleSearchIconClick}
              style={{ cursor: "pointer" }}
            >
              &#128269;
            </span>
            </h2>
          
          </span>
          {searchBarVisible && (
            <div className="container d-flex justify-content-between">
              <input
                type="text"
                className="form-control"
                placeholder="Search by keyword..."
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </div>
          )}
          <div className="row">
            {filteredArticles.length > 0
              ? filteredArticles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      key={v4()}
                      title={element.title}
                      description={element.content}
                      imageUrl={element.imageUrl}
                      newsUrl={element.url}
                      redMore={element.readMoreUrl}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source}
                    />
                  </div>
                ))
              : articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      key={v4()}
                      title={element.title}
                      description={element.content}
                      imageUrl={element.imageUrl}
                      newsUrl={element.url}
                      redMore={element.readMoreUrl}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source}
                    />
                  </div>
                ))}
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
