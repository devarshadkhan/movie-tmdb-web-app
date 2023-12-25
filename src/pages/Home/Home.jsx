

import React, { useCallback, useEffect, useState } from "react";
import "./Home.css";
import HeroBanner from "./HeroBanner/HeroBanner";
import MovieCard from "../../components/MovieCard/MovieCard";
import CircleRating from "../../components/circlerating/CircleRating";
import axiosInstance from "../../utils/axios";
import { API } from "../../utils/apiEndpoint";
import { useLoader } from "../../contextApp/LoaderContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upComingmovie, setupComing] = useState([]);
  const [chooseType, setChooseType] = useState("movie");
  const [chooseType1, setChooseType1] = useState("movie");
  const [dayWeek, setDayWeek] = useState("day");
  const [pmt, setPmt] = useState("movie");
  const { loader, setLoader } = useLoader();
//   const [loading, setLoading] = useState(false);

  const fetchData = async (url, setStateFunction) => {
    try {
        setLoader(true);
      const response = await axiosInstance.get(url);
      setStateFunction(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
        setLoader(false);
    }
  };

  const RatedMovie = () => fetchData(`${chooseType1}/top_rated`, setToprated);
  const trendingMovie = () =>
    fetchData(`/trending/${chooseType}/${dayWeek}`, setTrending);
  const popularMovie = () => fetchData(`${pmt}/popular`, setPopular);
  const upcomingMovie = () => fetchData("movie/upcoming", setupComing);


  useEffect(() => {
    console.log("Fetching data...");
    RatedMovie();
    console.log("USE EFFECT COMPLETE");
  }, [chooseType1, ]);


  useEffect(() => {
    console.log("Fetching data...");
    trendingMovie();
    console.log("USE EFFECT COMPLETE");
  }, [dayWeek, chooseType, ]);
  useEffect(() => {
    console.log("Fetching data...");
    popularMovie();
    console.log("USE EFFECT COMPLETE");
  }, [pmt ]);
  useEffect(() => {
    console.log("Fetching data...");
    upcomingMovie();
    console.log("USE EFFECT COMPLETE");
  }, [pmt ]);

  // useEffect(() => {
  //   console.log("Fetching data...");
  //   RatedMovie();
  //   trendingMovie();
  //   popularMovie();
  //   upcomingMovie();
  //   console.log("USE EFFECT COMPLETE");
  // }, [dayWeek, chooseType, pmt, chooseType1]);

  return (
    <>
      <HeroBanner />
      {/* {loader && (
        <div className="loadingWrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <MovieCard
        name="Top Rated"
        tv="tv"
        movie="movie"
        movieListing={toprated}
        changeSelectMovieType={setChooseType1}
        ChooseByMovieType={chooseType1}
      />
      <MovieCard
        movieListing={trending}
        name="Trending"
        day="day"
        week="week"
        tv="tv"
        movie="movie"
        chooseByWeek={dayWeek}
        ChooseByMovieType={chooseType}
        changeSelectWeekendType={setDayWeek}
        changeSelectMovieType={setChooseType}
      />
      <MovieCard
        name="Recommended for you"
        tv="tv"
        movie="movie"
        changeSelectMovieType={setPmt}
        ChooseByMovieType={pmt}
        movieListing={popular}
      />
      <MovieCard name="Upcoming" movieListing={upComingmovie} />
    </>
  );
};

export default Home;

