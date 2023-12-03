// import React, { useEffect, useState } from "react";
// import "./HeroBanner.css";
// import bgImg from "../../../assets/bgmain.png";
// import axiosInstance from "../../../utils/axios";
// import { API } from "../../../utils/apiEndpoint";
// import { useNavigate } from "react-router-dom";
// const HeroBanner = () => {
//   const [background,setBackground] = useState()
//   const [query,setQuery] = useState("")
//   const [search, setsearch] = useState([]);
//   const [ServiceMatch, setgServicematch] = useState([]);
//   const navigate = useNavigate()
//   // const trendingMovie = async ()=>{
//   //   await axiosInstance.get(`${API.allMovie}`)
//   //   .then((res)=>{
//   //     setBackground(res.data.results)
//   //   })
//   // }
//   // useEffect(()=>{
//   //   const bg =
//   //   `https://image.tmdb.org/t/p/w500$` +
//   //   background?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
//   //   trendingMovie(bg)
//   // },[background])

//   const fetchTrendingMovies = async () => {
//     try {
//       const response = await axiosInstance.get(API.allMovie);
//       const movies = response.data.results;
//       const randomIndex = Math.floor(Math.random() * movies.length);
//       const randomMovie = movies[randomIndex];

//       // Set the background to the backdrop_path of the random movie
//       if (randomMovie) {
//         setBackground(
//           `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching trending movies:", error);
//     }
//   };

//   // Search

//   const handleSearch = (e)=>{
//     setQuery(e.target.value)

//   }
//   const searchQueryHandle = (e)=>{
//     if(e.key === "Enter" && query.length > 0){
//       navigate(`search/${query}`)
//     }
//   }

//   const handleSearcFind = async()=>{
//     await axiosInstance.get(`${API.searchapi_result}?query=`)
//     .then((res)=>{
//       console.log("search_Data",res.data.results);
//     })
//   }
//   const Search_Services = (text) => {
//     if (!text) {
//       setQuery([]);
//     } else {
//       let data = search.filter((Data) => {
//         const Show = new RegExp(`${text}`);
//         return Data.query.match(Show) || Data.query.match(Show);
//       });
//       setQuery(data);
//     }
//   };

//   useEffect(() => {
//     fetchTrendingMovies();
//     handleSearcFind()
//   }, []);
//   return (
//     <>
//       <section className="homeWrp">
//         <img src={bgImg || "https://i.stack.imgur.com/IA7jp.gif"} />
//         <div className="homeWrpMain">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="searchBar">
//                   <input
//                     type="text"
//                     placeholder="Search for a movie or tv show...."
//                     value={query}
//                     onChange={(e)=>Search_Services(e.target.value)}
//                     onKeyUp={searchQueryHandle}
//                   />
//                   <button>search</button>
//                 </div>
//               </div>
//               <div className="ftyghj">
//                   {ServiceMatch &&
//                     ServiceMatch.map((e, _id) => {
//                       return (
//                         <>
//                           <ul>
//                             <li>
//                               <Link to={""}> {e.name}</Link>
//                             </li>
//                           </ul>
//                         </>
//                       );
//                     })}
//                 </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HeroBanner;

// import React, { useEffect, useState } from "react";
// import "./HeroBanner.css";
// import bgImg from "../../../assets/bgmain.png";
// import axiosInstance from "../../../utils/axios";
// import { API } from "../../../utils/apiEndpoint";
// import { useNavigate, Link } from "react-router-dom";

// const HeroBanner = () => {
//   const [background, setBackground] = useState("");
//   const [query, setQuery] = useState("");
//   const [search, setSearch] = useState([]);
//   const [serviceMatch, setServiceMatch] = useState([]);
//   const navigate = useNavigate();

//   const fetchTrendingMovies = async () => {
//     try {
//       const response = await axiosInstance.get(API.allMovie);
//       const movies = response.data.results;
//       const randomIndex = Math.floor(Math.random() * movies.length);
//       const randomMovie = movies[randomIndex];

//       if (randomMovie) {
//         setBackground(
//           `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching trending movies:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     setQuery(e.target.value);
//     SearchServices(e.target.value);
//   };

//   const searchQueryHandle = (e) => {
//     if (e.key === "Enter" && query.length > 0) {
//       navigate(`/search/${query}`);
//     }
//   };

//   const SearchServices = async (text) => {
//     if (!text) {
//       setSearch([]);
//     } else {
//       try {
//         const response = await axiosInstance.get(
//           `${API.searchapi_result}?query=${text}`
//         );
//         console.log("pppppppppppppppp", response.data.results);
//         const searchData = response.data.results;
//         setSearch(searchData);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchTrendingMovies();
//   }, []);

//   return (
//     <>
//       <section className="homeWrp">
//         <img
//           src={"https://static.toiimg.com/photo/msid-101260613/101260613.jpg" || "https://i.stack.imgur.com/IA7jp.gif"}
//           alt="Background"
//         />
//         <div className="homeWrpMain">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="searchBar">
//                   <input
//                     type="text"
//                     placeholder="Search for a movie or tv show...."
//                     value={query}
//                     onChange={handleSearch}
//                     onKeyUp={searchQueryHandle}
//                   />
//                   <button>Search</button>
//                 </div>
//                 <div className={`ftyghj ${search.length > 0 ? "show" : ""}`}>
//                   {search &&
//                     search?.map((e, _id) => (
//                       <div className="searUI">
//                         <ul key={_id} >
//                           <li className="listingn">
//                           <img className="logoImg"  src={
//                           e?.poster_path
//                             ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
//                             : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
//                         } />
//                           <Link to={`/${e.media_type}/${e.id}`}>
//                                   {e.title || e.name}
//                                 </Link>
//                             {/* {e.media_type === "movie" ? (
//                               <>
//                                 {" "}
//                                <img className="logoImg"  src={
//                           e?.poster_path
//                             ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
//                             : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
//                         } />
//                                 <Link to={`/${e.media_type}/${e.id}`}>
//                                   {e.title}
//                                 </Link>
//                                   <span>{e.original_title}</span>
//                               </>
//                             ) : (
//                               <>
//                                 {" "}
//                                 <Link to={`/${e.media_type}/${e.id}`}>
//                                   {e.name}
//                                 </Link>
//                               </>
//                             )} */}
//                           </li>
//                         </ul>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HeroBanner;


import React, { useEffect, useState } from "react";
import "./HeroBanner.css";
import bgImg from "../../../assets/bgmain.png";
import axiosInstance from "../../../utils/axios";
import { API } from "../../../utils/apiEndpoint";
import { useNavigate, Link } from "react-router-dom";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [serviceMatch, setServiceMatch] = useState([]);
  const navigate = useNavigate();

  const fetchTrendingMovies = async () => {
    try {
      const response = await axiosInstance.get(API.allMovie);
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];

      if (randomMovie) {
        setBackground(
          `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
        );
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const searchQueryHandle = () => {
    // Debounce the API call by delaying it for 300 milliseconds
    setTimeout(() => {
      if (query.length > 0) {
        SearchServices(query);
      }
    }, 300);
  };

  const SearchServices = async (text) => {
    if (!text) {
      setSearch([]);
    } else {
      try {
        const response = await axiosInstance.get(
          `${API.searchapi_result}?query=${text}`
        );
        console.log("pppppppppppppppp", response.data.results);
        const searchData = response.data.results;
        setSearch(searchData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <section className="homeWrp">
        <img
          src={
            "https://static.toiimg.com/photo/msid-101260613/101260613.jpg" ||
            "https://i.stack.imgur.com/IA7jp.gif"
          }
          alt="Background"
        />
        <div className="homeWrpMain">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="searchBar">
                  <input
                    type="text"
                    placeholder="Search for a movie or tv show...."
                    value={query}
                    onChange={handleSearch}
                    onKeyUp={searchQueryHandle}
                  />
                  <button>Search</button>
                </div>
                <div className={`ftyghj ${search.length > 0 ? "show" : ""}`}>
                  {search &&
                    search?.map((e, _id) => (
                      <div className="searUI" key={_id}>
                        <ul>
                          <li className="listingn">
                            <img
                              className="logoImg"
                              src={
                                e?.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${e.poster_path}`
                                  : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
                              }
                            />
                            <Link to={`/${e.media_type}/${e.id}`}>
                              {e.title || e.name}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
