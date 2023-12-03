import React, { useCallback, useEffect, useState } from "react";
import "./Home.css";
import HeroBanner from "./HeroBanner/HeroBanner";
import MovieCard from "../../components/MovieCard/MovieCard";
import CircleRating from "../../components/circlerating/CircleRating";
import axiosInstance from "../../utils/axios";
import { API } from "../../utils/apiEndpoint";
import { useLoader } from "../../contextApp/LoaderContext";
const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upComingmovie, setupComing] = useState([]);
  const [chooseType, setChooseType] = useState("movie");
  const [chooseType1, setChooseType1] = useState("movie");
  const [dayWeek, setDayWeek] = useState("day");
  const [pmt, setPmt] = useState("movie");
  const {loader,setLoader} = useLoader()
  const RatedMovie = async (movie) => {
    setLoader(true)
    await axiosInstance.get(`${movie}/top_rated`)
    .then((res) => {
      setLoader(false)
      setToprated(res.data.results);
    })
    .catch((err)=>{
      setLoader(false)
    })
  };

  const changeSelectMovieType2 = useCallback((value) => {
    setChooseType1(value);
  }, []);

  // DUSRA  ====
  const trendingMovie = async (choose_weekDay, choose_type_Show) => {
    setLoader(true)
    await axiosInstance
      .get(`/trending/${choose_type_Show}/${choose_weekDay}`)
      .then((res) => {
        setLoader(false)
        setTrending(res.data.results);
      }).catch((err)=>{
        setLoader(false)
      })
  };

  const onSelectChange1 = useCallback((value) => {
    setDayWeek(value);
  }, []);

  const changeSelectMovieType = useCallback((value) => {
    setChooseType(value);
  }, []);

  // thesra
  const popularMovie = async (params) => {
    setLoader(true)
    await axiosInstance.get(`${params}/popular`).then((res) => {
      setLoader(false)
      setPopular(res.data.results);
    })
    .catch((err)=>{
      setLoader(false)
    })
  };

  const onSelectChange2 = (value) => {
    // console.log(value);
    setPmt(value);
  };
  // fourth

  const upcomingMovie = async (params) => {
    await axiosInstance.get(`movie/upcoming`).then((res) => {
      setupComing(res.data.results);
    });
  };

  // useEffect(() => {
  //   console.log("USEEFFCT.......RUNNIG");
    
  //     trendingMovie(dayWeek, chooseType);
  //   popularMovie(pmt);
  //     RatedMovie(chooseType1);
  //     upcomingMovie()
    
  // }, [dayWeek, chooseType,pmt,chooseType1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching trending movies...");
        await trendingMovie(dayWeek, chooseType);

        console.log("Fetching popular movies...");
        await popularMovie(pmt);

        console.log("Fetching top-rated movies...");
        await RatedMovie(chooseType1);

        console.log("Fetching upcoming movies...");
        await upcomingMovie();

        console.log("USE EFFECT COMPLETE");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dayWeek, chooseType, pmt, chooseType1]);

  return (
    <>
      <HeroBanner />
      <MovieCard
        name="Top Rated"
        tv="tv"
        movie="movie"
        movieListing={toprated}
        changeSelectMovieType={changeSelectMovieType2}
        ChooseByMovieType={chooseType1}
        // loading={loader}
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
        changeSelectWeekendType={onSelectChange1}
        changeSelectMovieType={changeSelectMovieType}
        // loading={loading}
      />
      <MovieCard
        name="Recommended for you"
        tv="tv"
        movie="movie"
        changeSelectMovieType={onSelectChange2}
        ChooseByMovieType={pmt}
        movieListing={popular}
        // loading={loading}
      />
      <MovieCard name="Upcoming" movieListing={upComingmovie} />
    </>
  );
};

export default Home;

// // import React, { useEffect, useState } from "react";
// // import "./Home.css";
// // import HeroBanner from "./HeroBanner/HeroBanner";
// // import MovieCard from "../../components/MovieCard/MovieCard";
// // import axiosInstance from "../../utils/axios";
// // import { API } from "../../utils/apiEndpoint";

// // const Home = () => {
// //   // Define states to manage data and user selections
// //   const [trending, setTrending] = useState([]);
// //   const [popular, setPopular] = useState([]);
// //   const [toprated, setToprated] = useState([]);
// //   const [upComingmovie, setUpcoming] = useState([]);
// //   const [select, setSelect] = useState("movie");
// //   const [dayWeek, setDayWeek] = useState("day");
// //   const [pmt, setPmt] = useState("movie");

// //   // Function to fetch trending movies by day
// //   const trendingMoviesByDay = async () => {
// //     const response = await axiosInstance.get(`${API.allMovie}/day`);
// //     setTrending(response.data.results);
// //   };

// //   // Function to fetch trending movies by week
// //   const trendingMoviesByWeek = async () => {
// //     const response = await axiosInstance.get(`${API.allMovie}/week`);
// //     setTrending(response.data.results);
// //   };

// //   // Function to fetch popular movies
// //   const fetchPopularMovies = async () => {
// //     const response = await axiosInstance.get("movie/popular");
// //     setPopular(response.data.results);
// //   };

// //   // Function to fetch popular TV shows
// //   const fetchPopularTVShows = async () => {
// //     const response = await axiosInstance.get("tv/popular");
// //     setPopular(response.data.results);
// //   };

// //   // Function to fetch top-rated movies or TV shows based on user selection
// //   const fetchTopRated = async () => {
// //     if (select === "movie") {
// //       const response = await axiosInstance.get("movie/top_rated");
// //       setToprated(response.data.results);
// //     } else {
// //       const response = await axiosInstance.get("tv/top_rated");
// //       setToprated(response.data.results);
// //     }
// //   };

// //   // Function to fetch upcoming movies
// //   const fetchUpcomingMovies = async () => {
// //     const response = await axiosInstance.get(API.upComing);
// //     setUpcoming(response.data.results);
// //   };

// //   useEffect(() => {
// //     // Fetch popular movies and upcoming movies when the component mounts
// //     fetchPopularMovies();
// //     fetchUpcomingMovies();
// //   }, []);

// //   useEffect(() => {
// //     // Fetch top-rated movies or TV shows based on user selection
// //     fetchTopRated();

// //     // Fetch trending movies by day or week based on user selection
// //     if (dayWeek === "day") {
// //       trendingMoviesByDay();
// //     } else {
// //       trendingMoviesByWeek();
// //     }

// //     // Fetch popular movies or TV shows based on user selection
// //     if (pmt === "movie") {
// //       fetchPopularMovies();
// //     } else {
// //       fetchPopularTVShows();
// //     }
// //   }, [select, dayWeek, pmt]);

// //   // Handle user selection changes for "select"
// //   const onSelectChange = (value) => {
// //     setSelect(value);
// //   };

// //   // Handle user selection changes for "dayWeek"
// //   const onSelectChangeDayWeek = (value) => {
// //     setDayWeek(value);
// //   };

// //   // Handle user selection changes for "pmt"
// //   const onSelectChangePMT = (value) => {
// //     setPmt(value);
// //   };

// //   return (
// //     <>
// //       <HeroBanner />
// //       <MovieCard
// //         name="Top Rated"
// //         data1="Tv show"
// //         data2="movie"
// //         trending={toprated}
// //         onSelectChange={onSelectChange}
// //         select={select}
// //       />
// //       <MovieCard
// //         name="Trending"
// //         data1="day"
// //         data2="week"
// //         day={"day"} // You can set "day" as a constant if needed
// //         select={dayWeek}
// //         trending={trending}
// //         onSelectChange={onSelectChangeDayWeek}
// //       />
// //       <MovieCard
// //         name="Recommended for you"
// //         data1="Tv show"
// //         data2="movie"
// //         onSelectChange={onSelectChangePMT}
// //         select={pmt}
// //         trending={popular}
// //       />
// //       <MovieCard name="Upcoming" trending={upComingmovie} />
// //     </>
// //   );
// // };

// // export default Home;
