import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function MovieList() {
  const [movies, setMovies] = useState(-1);
  const [year, setYear] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    if (year) {
      const url = `https://jsonmock.hackerrank.com/api/movies?Year=${year}`;
      const fetchData = async () => {
        const res = await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            return data.data;
          });

        setMovies(res);
      };

      fetchData();
    }
  }, [year]);

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="number"
          className="large"
          placeholder="Enter Year eg 2015"
          ref={inputEl}
          data-testid="app-input"
        />
        <button
          className=""
          onClick={() => setYear(inputEl.current.value)}
          data-testid="submit-button"
        >
          Search
        </button>
      </section>

      <ul className="mt-50 styled" data-testid="movieList">
        {movies && movies.length > 0 ?  
         movies.map((movie,i) => <li key={i} className="slide-up-fade-in py-10"> {movie.Title} </li>)   
         : '' 
         }
      </ul>

      { movies.length == 0 ? <div data-testid="no-result">No Results Found</div> : ''}

      <div className="mt-50 slide-up-fade-in" ></div>
    </div>
  );
}

export default MovieList;
