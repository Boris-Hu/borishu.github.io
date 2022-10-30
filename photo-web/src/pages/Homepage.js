import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f9170000100000188519a289dbf4b71ba94e1f5659a7871";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=16";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=1`;

  //Search funtion, fetch data from pexels api
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
  };

  //Load more pictures
  const loadpics = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  // fetch data when the page loads up
  useEffect(() => {
    search(initialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
    search(searchURL);
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="loadPictures">
        <button onClick={loadpics}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
