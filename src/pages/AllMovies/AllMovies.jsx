
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { API } from "../../utils/apiEndpoint";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatDateToMonthNameDayYear } from "../../utils/hooks";
import Loader from "../../components/loader/Loader";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const AllMovies = () => {
  const { mediaType } = useParams();
  const [allMovie, setAllMovie] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showResultsNotFound, setShowResultsNotFound] = useState(false);

  const trendingMovie = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call
      const response = await axiosInstance.get(
        `${API.allDiscoverMovie}/${mediaType}?page=${page}`
      );
      const newMovies = response.data.results;

      if (newMovies.length === 0) {
        setShowResultsNotFound(true);
      } else {
        setShowResultsNotFound(false);
        setAllMovie((prevMovies) => [...prevMovies, ...newMovies]);
        setPage(page + 1);

        if (page >= response.data.total_pages) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    trendingMovie();
  }, [mediaType]);

  return (
    <div>
        
      <section className="movieCard">
        <div className="container">
          <h4 className="mb-4">{mediaType}</h4>

          
            <InfiniteScroll
              dataLength={allMovie.length}
              next={trendingMovie}
              hasMore={hasMore}
              className="infinite"
              // loader={<Loader />}
            >
              <div className="row">
                {allMovie.map((e) => (
                  <div key={e.id} className="col-12 col-md-2">
                    <Link to={`/${e.media_type || mediaType}/${e.id}`}>
                      {/* <img
                        src={
                          e.poster_path
                            ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                            : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
                        }
                        alt={e.title}
                      /> */}
                      <LazyLoadImage
 alt={e.title}
 effect="blur"
      src={
                          e.poster_path
                            ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                            : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
                        }
  />
                      <div className="mainRD">
                        <div>
                          <p>
                            {e?.title || e?.name
                              ? `${(e?.title || e?.name)?.substring(0, 10)}...`
                              : "Title Not Available"}
                          </p>
                          <p>
                            {" "}
                            <span>
                              {formatDateToMonthNameDayYear(
                                e.release_date || e?.first_air_date
                              )}
                            </span>{" "}
                          </p>
                        </div>
                        <div className="circleRating">
                          <CircularProgressbar
                            value={e.vote_average.toFixed(2)}
                            maxValue={10}
                            text={e.vote_average.toFixed(1)}
                            styles={buildStyles({
                              pathColor:
                                e.vote_average < 5
                                  ? "red"
                                  : e.vote_average < 7
                                  ? "orange"
                                  : "green",
                            })}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          
        </div>
      </section>
          
      {/* <section className="movieCard">
        <div className="container">
          <h4 className="mb-4">{mediaType}</h4>
          {loading ? (
            <div className="sketlon">
              {(loading ? Array.from(new Array(12)) : allMovie).map((id, index) => (
                <div key={index} className="bodysketlon">
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton variant="rectangular" width={310} height={120} />
                    <Skeleton width="40%" />
                  </SkeletonTheme>
                </div>
              ))}
            </div>
          ) : allMovie.length > 0 ? (
            <InfiniteScroll
              dataLength={allMovie.length}
              next={trendingMovie}
              hasMore={hasMore}
              className="infinite"
              // loader={<Loader />}
            >
              <div className="row">
                {allMovie.map((e) => (
                  <div key={e.id} className="col-12 col-md-2">
                    <Link to={`/${e.media_type || mediaType}/${e.id}`}>
                      <img
                        src={
                          e.poster_path
                            ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                            : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
                        }
                        alt={e.title}
                      />
                      <div className="mainRD">
                        <div>
                          <p>
                            {e?.title || e?.name
                              ? `${(e?.title || e?.name)?.substring(0, 10)}...`
                              : "Title Not Available"}
                          </p>
                          <p>
                            {" "}
                            <span>
                              {formatDateToMonthNameDayYear(
                                e.release_date || e?.first_air_date
                              )}
                            </span>{" "}
                          </p>
                        </div>
                        <div className="circleRating">
                          <CircularProgressbar
                            value={e.vote_average.toFixed(2)}
                            maxValue={10}
                            text={e.vote_average.toFixed(1)}
                            styles={buildStyles({
                              pathColor:
                                e.vote_average < 5
                                  ? "red"
                                  : e.vote_average < 7
                                  ? "orange"
                                  : "green",
                            })}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            showResultsNotFound && (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )
          )}
        </div>
      </section> */}
    </div>
  );
};

export default AllMovies;






// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axios";
// import { API } from "../../utils/apiEndpoint";
// import { Link, useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { formatDateToMonthNameDayYear } from "../../utils/hooks";
// import Loader from "../../components/loader/Loader";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const AllMovies = () => {
//   const { mediaType } = useParams();
//   const [allMovie, setAllMovie] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [showResultsNotFound, setShowResultsNotFound] = useState(false);

//   const trendingMovie = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(
//         `${API.allDiscoverMovie}/${mediaType}?page=${page}`
//       );
//       const newMovies = response.data.results;

//       if (newMovies.length === 0) {
//         setShowResultsNotFound(true);
//       } else {
//         setShowResultsNotFound(false);
//         setAllMovie((prevMovies) => [...prevMovies, ...newMovies]);
//         setPage(page + 1);

//         if (page >= response.data.total_pages) {
//           setHasMore(false);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     trendingMovie();
//   }, [mediaType]); 

//   return (
//     <div>
//       <section className="movieCard">
//         <div className="container">
//           <h4 className="mb-4">{mediaType}</h4>
//           {loading ? (
//             <div className="sketlon">
//               {(loading ? Array.from(new Array(12)) : allMovie).map((id, index) => (
//                 <div key={index} className="bodysketlon">
//                   <SkeletonTheme baseColor="#202020" highlightColor="#444">
//                     <Skeleton variant="rectangular" width={310} height={120} />
//                     <Skeleton width="40%" />
//                   </SkeletonTheme>
//                 </div>
//               ))}
//             </div>
//           ) : allMovie.length > 0 ? (
//             <InfiniteScroll
//               dataLength={allMovie.length}
//               next={trendingMovie}
//               hasMore={hasMore}
//               className="infinite"
//               loader={<Loader />}
//             >
//               <div className="row">
//                 {allMovie.map((e) => (
//                   <div key={e.id} className="col-12 col-md-2">
//                     <Link to={`/${e.media_type || mediaType}/${e.id}`}>
//                       <img
//                         src={
//                           e.poster_path
//                             ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
//                             : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
//                         }
//                         alt={e.title}
//                       />
//                       <div className="mainRD">
//                         <div>
//                           <p>
//                             {e?.title || e?.name
//                               ? `${(e?.title || e?.name)?.substring(0, 10)}...`
//                               : "Title Not Available"}
//                           </p>
//                           <p>
//                             {" "}
//                             <span>
//                               {formatDateToMonthNameDayYear(
//                                 e.release_date || e?.first_air_date
//                               )}
//                             </span>{" "}
//                           </p>
//                         </div>
//                         <div className="circleRating">
//                           <CircularProgressbar
//                             value={e.vote_average.toFixed(2)}
//                             maxValue={10}
//                             text={e.vote_average.toFixed(1)}
//                             styles={buildStyles({
//                               pathColor:
//                                 e.vote_average < 5
//                                   ? "red"
//                                   : e.vote_average < 7
//                                   ? "orange"
//                                   : "green",
//                             })}
//                           />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </InfiniteScroll>
//           ) : (
//             showResultsNotFound && (
//               <span className="resultNotFound">Sorry, Results not found!</span>
//             )
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AllMovies;






// import React, { useEffect, useState } from "react";
// // import MovieCard from "../../components/MovieCard/MovieCard";
// import axiosInstance from "../../utils/axios";
// import { API } from "../../utils/apiEndpoint";
// import "../../components/MovieCard/MovieCard.css";
// import { Link, useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { formatDateToMonthNameDayYear } from "../../utils/hooks";
// import Loader from "../../components/loader/Loader";
// const AllMovies = () => {
//   //   const { mediaType } = useParams();
//   //   const [allMovie, setAllmovie] = useState();
//   //   const [allTv, setTvAll] = useState();

//   //   const trendingMovie = async () => {
//   //     await axiosInstance
//   //       .get(`${API.allDiscoverMovie}/${mediaType}`)
//   //       .then((res) => {
//   //         console.log(res);
//   //         setAllmovie(res.data.results);
//   //       });
//   //   };

//   //   useEffect(() => {
//   //     trendingMovie();
//   //   }, []);

//   const { mediaType } = useParams();
//   const [allMovie, setAllmovie] = useState([]);
//   const [hasMore, setHasMore] = useState(true); // Indicates if there are more items to load
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const trendingMovie = async () => {
//     try {
//       // setLoading(true);
//       const response = await axiosInstance.get(
//         `${API.allDiscoverMovie}/${mediaType}?page=${page}`
//       );
//       const newMovies = response.data.results;
//       setAllmovie((prevMovies) => [...prevMovies, ...newMovies]);
//       setPage(page + 1);

//       // Check if there are more pages to load
//       if (page >= response.data.total_pages) {
//         setHasMore(false);
     
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//     finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     trendingMovie();
//   }, [mediaType]);

//   return (
//     <div>
//       {/* <MovieCard trending={allMovie} /> */}
//       <div>
//         <section className="movieCard ">
//           <div className="container">
//             <h4>{mediaType}</h4>
         
//               {allMovie.length  > 0 ? <>
//                 <InfiniteScroll
//               dataLength={allMovie.length}
//               next={trendingMovie}
//               hasMore={hasMore}
//               className="infinite"
//               loader={<Loader />}
//               // loader={
//               //   allMovie.length > 0 ? (
//               //     <>
//               //       <div
//               //         class="spinner-border text-light text-center d-block"
//               //         role="status"
//               //       >
//               //         <span class="visually-hidden"></span>
//               //       </div>
//               //     </>
//               //   ) : (
//               //     ""
//               //   )
//               // }
//             >
//               <div className="row">
             
               
//                 {allMovie?.map((e) => (
//                   <div key={e.id} className="col-12 col-md-2">
//                     <Link to={`/${e.media_type || mediaType}/${e.id}`}>
//                       <img
//                         src={
//                           e.poster_path
//                             ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
//                             : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
//                         }
//                         alt={e.title}
//                       />

//                       <div className="mainRD">
//                         <div>
//                           <p>
//                             {e?.title || e?.name
//                               ? `${(e?.title || e?.name)?.substring(0, 10)}...`
//                               : "Title Not Available"}
//                           </p>

//                           <p>
//                             {" "}
//                             <span>
//                               {formatDateToMonthNameDayYear(
//                                 e.release_date || e?.first_air_date
//                               )}
//                             </span>{" "}
//                           </p>
//                         </div>

//                         <div className="circleRating">
//                           <CircularProgressbar
//                             value={e.vote_average.toFixed(2)}
//                             maxValue={10}
//                             text={e.vote_average.toFixed(1)}
//                             styles={buildStyles({
//                               pathColor:
//                                 e.vote_average < 5
//                                   ? "red"
//                                   : e.vote_average < 7
//                                   ? "orange"
//                                   : "green",
//                             })}
//                           />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
               
//               </div>
//             </InfiniteScroll>
//               </>:<><span className="resultNotFound">
//                                 Sorry, Results not found!
//                             </span></>}
        
           
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AllMovies;

// // <div>
// //         <section className="movieCard h-100">
// //           <div className="container">
// //             <div className="row">
// //               <h4>{mediaType}</h4>
// //               {allMovie?.map((e) => {
// //                 return (
// //                   <>
// //                     <div className="col-12 col-md-2">
// //                       {/* <Link to={`/${mediaType}/${e?.id}`}> */}
// //                       <Link to={`/${e?.media_type || mediaType}/${e?.id}`}>
// //                         <img
// //                         src={e?.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"}
// //                         //   src={`https://image.tmdb.org/t/p/w500${e.poster_path}` || "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"}
// //                         />
// //                       </Link>
// //                     </div>
// //                   </>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </section>
// //       </div>


























// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axios";
// import { API } from "../../utils/apiEndpoint";
// import "../../components/MovieCard/MovieCard.css";
// import { Link, useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { formatDateToMonthNameDayYear } from "../../utils/hooks";
// import Loader from "../../components/loader/Loader";

// const AllMovies = () => {
//   const { mediaType } = useParams();
//   const [allMovie, setAllmovie] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false); // Initialize loading as false

//   const trendingMovie = async () => {
//     try {
//       setLoading(true); // Set loading to true when fetching data

//       const response = await axiosInstance.get(
//         `${API.allDiscoverMovie}/${mediaType}?page=${page}`
//       );

//       const newMovies = response.data.results;
//       setAllmovie((prevMovies) => [...prevMovies, ...newMovies]);
//       setPage(page + 1);

//       if (page >= response.data.total_pages) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     } finally {
//       setLoading(false); // Set loading back to false when data fetching is complete
//     }
//   };

//   useEffect(() => {
//     // Reset the state when the mediaType parameter changes
//     setAllmovie([]);
//     // setPage(1);
//     setHasMore(true);

//     // Fetch data for the new mediaType
//     trendingMovie();
//   }, [mediaType]);

//   return (
//     <div>
//       <div>
//         <section className="movieCard">
//           <div className="container">
//             <h4>{mediaType}</h4>
//             {/* {loading && <Loader />} */}
//             {/* {!loading && ( */}
//               <>
//                 {allMovie.length > 0 ? (
//                   <InfiniteScroll
//                     dataLength={allMovie.length}
//                     next={trendingMovie}
//                     hasMore={hasMore}
//                     className="infinite"
//                     loader={<Loader />}
//                   >
//                     <div className="row">
//                       {allMovie.map((e) => (
//                         <div key={e.id} className="col-12 col-md-2">
//                           <Link to={`/${e.media_type || mediaType}/${e.id}`}>
//                             <img
//                               src={
//                                 e.poster_path
//                                   ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
//                                   : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
//                               }
//                               alt={e.title}
//                             />
//                             <div className="mainRD">
//                               <div>
//                                 <p>
//                                   {e?.title || e?.name
//                                     ? `${(e?.title || e?.name)?.substring(0, 10)}...`
//                                     : "Title Not Available"}
//                                 </p>

//                                 <p>
//                                   {" "}
//                                   <span>
//                                     {formatDateToMonthNameDayYear(
//                                       e.release_date || e?.first_air_date
//                                     )}
//                                   </span>{" "}
//                                 </p>
//                               </div>

//                               <div className="circleRating">
//                                 <CircularProgressbar
//                                   value={e.vote_average.toFixed(2)}
//                                   maxValue={10}
//                                   text={e.vote_average.toFixed(1)}
//                                   styles={buildStyles({
//                                     pathColor:
//                                       e.vote_average < 5
//                                         ? "red"
//                                         : e.vote_average < 7
//                                         ? "orange"
//                                         : "green",
//                                   })}
//                                 />
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   </InfiniteScroll>
//                 ) : (
//                   <span className="resultNotFound">
//                     Sorry, Results not found!
//                   </span>
//                 )}
//               </>
//             {/* )} */}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AllMovies;





























/**OLD Code */




// import React, { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axios";
// import { API } from "../../utils/apiEndpoint";
// import "../../components/MovieCard/MovieCard.css";
// import { Link, useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { formatDateToMonthNameDayYear } from "../../utils/hooks";
// import Loader from "../../components/loader/Loader";

// const AllMovies = () => {
//   const { mediaType } = useParams();
//   const [allMovie, setAllmovie] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false); // Initialize loading as false

//   const trendingMovie = async () => {
//     try {
//       setLoading(true); // Set loading to true when fetching data

//       const response = await axiosInstance.get(
//         `${API.allDiscoverMovie}/${mediaType}?page=${allMovie.length / 20 + 1}` // Calculate the next page based on the length of allMovie
//       );

//       const newMovies = response.data.results;
//       setAllmovie((prevMovies) => [...prevMovies, ...newMovies]);

//       if (allMovie.length >= response.data.total_results) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     } finally {
//       setLoading(false); // Set loading back to false when data fetching is complete
//     }
//   };

//   useEffect(() => {
//     // Reset the state when the mediaType parameter changes
//     setAllmovie([]);
//     setHasMore(true);

//     // Fetch data for the new mediaType
//     trendingMovie();
//   }, [mediaType]);

//   return (
//     <div>
//       <div>
//         <section className="movieCard">
//           <div className="container">
//             <h4>{mediaType}</h4>
//             {/* {loading && <Loader />} */}
//             {/* {!loading && ( */}
//               <>
//                 {allMovie.length > 0 ? (
//                   <InfiniteScroll
//                     dataLength={allMovie.length}
//                     next={trendingMovie}
//                     hasMore={hasMore}
//                     className="infinite"
//                     loader={<Loader />}
//                   >
//                     <div className="row">
//                       {allMovie.map((e) => (
//                         <div key={e.id} className="col-12 col-md-2">
//                           <Link to={`/${e.media_type || mediaType}/${e.id}`}>
//                             <img
//                               src={
//                                 e.poster_path
//                                   ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
//                                   : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
//                               }
//                               alt={e.title}
//                             />
//                             <div className="mainRD">
//                               <div>
//                                 <p>
//                                   {e?.title || e?.name
//                                     ? `${(e?.title || e?.name)?.substring(0, 10)}...`
//                                     : "Title Not Available"}
//                                 </p>

//                                 <p>
//                                   {" "}
//                                   <span>
//                                     {formatDateToMonthNameDayYear(
//                                       e.release_date || e?.first_air_date
//                                     )}
//                                   </span>{" "}
//                                 </p>
//                               </div>

//                               <div className="circleRating">
//                                 <CircularProgressbar
//                                   value={e.vote_average.toFixed(2)}
//                                   maxValue={10}
//                                   text={e.vote_average.toFixed(1)}
//                                   styles={buildStyles({
//                                     pathColor:
//                                       e.vote_average < 5
//                                         ? "red"
//                                         : e.vote_average < 7
//                                         ? "orange"
//                                         : "green",
//                                   })}
//                                 />
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       ))}
//                     </div>
//                   </InfiniteScroll>
//                 ) : (
//                   <span className="resultNotFound">
//                     Sorry, Results not found!
//                   </span>
//                 )}
//               </>
//             {/* )} */}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AllMovies;
