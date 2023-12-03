import React, { useState } from "react";
import Slider from "react-slick";
import "./MovieCard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import {
  formatDateToMonthNameDayYear,
  formatDateToSepDateYear,
} from "../../utils/hooks";
import { useLoader } from "../../contextApp/LoaderContext";

const MovieCard = ({
  movieListing,
  name,
  chooseByWeek,
  ChooseByMovieType,
  changeSelectWeekendType,
  day,
  week,
  tv,
  movie,
  changeSelectMovieType,
}) => {
const {loader} = useLoader()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
  };

  return (
    <>
      <div>
        <section className="movieCard">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="selectT">
                  <h4>{name}</h4>
                  {chooseByWeek && (
                    <>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={chooseByWeek}
                        onChange={(e) => changeSelectWeekendType(e.target.value)}
                      >
                        <option value={day}>{day}</option>
                        <option value={week}>{week}</option>
                      </select>
                    </>
                  )}
               {changeSelectMovieType &&  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={ChooseByMovieType}
                    onChange={(e) => changeSelectMovieType(e.target.value)}
                  >
                    <option value={tv}>{tv}</option>
                    <option value={movie}>{movie}</option>
                  </select>}
                 
                </div>
              </div>
              {loader ? (
              
                <div className="spinner-border text-secondary text-center d-" role="status">
                  <span className="visually-hidden"></span>
                </div>
              ) : (
                <Slider {...settings}>
                  {movieListing?.map((e) => (
                    <Link
                      to={`/${e?.media_type || ChooseByMovieType || "movie"}/${e?.id}`}
                      key={e?.id}
                    >
                      <span>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${e?.poster_path}`}
                          className="cardImg"
                        />
                      </span>

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
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieCard;



// import React from "react";
// import Slider from "react-slick";
// import "./MovieCard.css";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { Link } from "react-router-dom";
// import {
//   formatDateToMonthNameDayYear,
//   formatDateToSepDateYear,
// } from "../../utils/hooks";
// const MovieCard = ({
//   movieListing,
//   name,
//   chooseByWeek,
//   ChooseByMovieType,
//   changeSelectWeekendType,
//   day,
//   week,
//   tv,
//   movie,
//   changeSelectMovieType
// }) => {
//   console.log(movieListing);
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     dots: false,
//   };
//   return (
//     <>
//       <div>
//         <section className="movieCard">
//           <div className="container">
//             <div className="row">
//               <div className="col-12">
//                 <div className="selectT">
//                   <h4>{name}</h4>
//                   {chooseByWeek ? (
//                     <>
//                       <select
//                         class="form-select"
//                         aria-label="Default select example"
//                         value={chooseByWeek}
//                         onChange={(e) => changeSelectWeekendType(e.target.value)}
//                       >
//                         {/* <option selected>Open this select menu</option> */}
//                         <option value={day}>{day}</option>
//                         <option value={week}>{week}</option>
//                       </select>
//                     </>
//                   ) : (
//                     ""
//                   )}
               
//                       <select
//                         class="form-select"
//                         aria-label="Default select example"
//                         value={ChooseByMovieType}
//                         onChange={(e) => changeSelectMovieType(e.target.value)}
//                       >
//                         {/* <option selected>Open this select menu</option> */}
//                         <option value={tv}>{tv}</option>
//                         <option value={movie}>{movie}</option>
//                       </select>
                  
//                 </div>
//               </div>
//               <Slider {...settings}>
//                 {movieListing?.map((e) => {
//                   {/* console.log("+==================", e.media_type); */}
//                   return (
//                     <>
//                       <Link
//                         to={`/${e?.media_type || ChooseByMovieType}/${e?.id}`}
//                         // to={e?.media_type ? `/${e?.media_type}/${e?.id}` : "#"}
//                         key={e?.id}
//                         className=""
//                       >
//                         <span>
//                           <img
//                             src={`https://image.tmdb.org/t/p/w500${e?.poster_path}`}
//                             className="cardImg"
//                           />
//                         </span>

//                         <div className="mainRD">
//                           <div>
                           
//                             <p>
//                               {e?.title || e?.name
//                                 ? `${(e?.title || e?.name)?.substring(
//                                     0,
//                                     10
//                                   )}...`
//                                 : "Title Not Available"}
//                             </p>

//                             <p>
//                               {" "}
//                               <span>
//                                 {formatDateToMonthNameDayYear(
//                                   e.release_date || e?.first_air_date
//                                 )}
//                               </span>{" "}
//                             </p>
//                           </div>
//                           <div className="circleRating">
//                             <CircularProgressbar
//                               value={e.vote_average.toFixed(2)}
//                               maxValue={10}
//                               text={e.vote_average.toFixed(1)}
//                               styles={buildStyles({
//                                 pathColor:
//                                   e.vote_average < 5
//                                     ? "red"
//                                     : e.vote_average < 7
//                                     ? "orange"
//                                     : "green",
//                               })}
//                             />
//                           </div>
//                         </div>
//                       </Link>
//                     </>
//                   );
//                 })}
//               </Slider>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default MovieCard;
