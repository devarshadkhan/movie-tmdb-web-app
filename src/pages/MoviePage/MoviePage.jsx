import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import bgImgM from "../../assets/dummy 2.png";
import starIcon from "../../assets/ant-design_star-filled.svg";
import playBtn from "../../assets/playbtn.png";
import axiosInstance from "../../utils/axios";
import { API } from "../../utils/apiEndpoint";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { formatDateToMonthNameDayYear, toHoursAndMinutes } from "../../utils/hooks";
import { useLoader } from "../../contextApp/LoaderContext";
const Movie = () => {
  const { id, mediatype } = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
  };
  const [singleMovie, setSingleMovie] = useState("");
  
  const { loader, setLoader } = useLoader();
  const trendingMovie = async () => {
    setLoader(true)
    await axiosInstance.get(`${mediatype}/${id}`)
    .then((res) => {
      setLoader(false)
      setSingleMovie(res.data);
    })
    .catch((err)=>{
      setLoader(false)
    })
  };
  useEffect(() => {
    trendingMovie();
  }, []);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const castApi = async () => {
    await axiosInstance.get(`${mediatype}/${id}/credits`).then((res) => {
      setCast(res.data.cast);
      setCrew(res.data.crew);
      // console.log(res.data.cast);
    });
  };
  useEffect(() => {
    castApi();
  }, []);

  return (
    <>
  
      <div className="moviewrap">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="leftSide">
                <h6>
                  {singleMovie?.original_title || singleMovie?.original_name}
                </h6>

                <p className="srtDecs">{singleMovie?.overview}</p>
                <div className="rating">
                  <img src={starIcon} />
                  <p>
                    {/* {singleMovie?.vote_count} */}(
                    {singleMovie?.vote_average?.toFixed(1)})
                  </p>
                </div>
                <div className="genre">
                  <p>
                    Genres:{" "}
                    <span>
                      {singleMovie?.genres?.map((gen) => gen.name).join(", ")}
                    </span>
                  </p>
                </div>
                {/* <div className="cast">
                  <p>
                    Cast: <span>Romance, fantacy</span>
                  </p>
                </div> */}
                <div className="subtitles">
                  <p>
                    langauage:{" "}
                    <span>
                      {singleMovie?.spoken_languages
                        ?.map((e) => e.name)
                        .join(", ")}
                    </span>
                  </p>
                </div>
                <div className="status">
                  <p>
                    Status: <span>{singleMovie?.status}</span>
                  </p>
                </div>
                <div className="status">
                  <p>
                    Release Date: <span>{formatDateToMonthNameDayYear(singleMovie?.release_date || singleMovie?.first_air_date)}</span>
                  </p>
                </div>
                <div className="status">
                  <p>
                    Runtime:{" "}
                    <span>
                      {toHoursAndMinutes(
                        singleMovie?.runtime || singleMovie?.episode_run_time
                      )}
                    </span>
                  </p>
                </div>
                {/* <div className="status">
                  <p>
                    Episode:{" "}
                    <span>{toHoursAndMinutes(singleMovie?.runtime || singleMovie?.episode_run_time)}</span>
                  </p>
                </div> */}
                <div className="butnsPlay">
                  <a target="_blank" href={singleMovie?.homepage || ""}>
                    <img src={playBtn} />
                    Watch trailer
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7 ">
              <div className="dsfhds">
                <div className="rightSide">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${singleMovie?.backdrop_path}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mediatype === "movie" ? (
        <div>
          {" "}
          <div className="castWrp">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="cast">
                    <h1>Cast</h1>
                    <Slider {...settings}>
                  {cast?.map((item) => {
                        return (
                          <>
                            {/* <img  src={item?.profile_path? "https://image.tmdb.org/t/p/w500${item?.profile_path":"https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"} /> */}
                            <img
                              src={
                                item?.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${item?.profile_path}`
                                  : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                              }
                            />
                            <h4>{item?.name}</h4>
                            <p>{item?.character}</p>
                          </>
                        );
                      })} 
                    </Slider>
                  </div>
                </div>
                {/* <div className="col-12">
                  <div className="cast">
                    <h1>Crew</h1>
                    <Slider {...settings}>
                      {crew?.map((item) => {
                        return (
                          <>
                            <img
                              src={
                                item?.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${item?.profile_path}`
                                  : "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                              }
                            />
                           
                            <h4>{item?.name}</h4>
                          </>
                        );
                      })}
                    </Slider>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="castWrp">
          <div className="container">
            <div className="row">
              {/* <div className="casts"> */}
              <h1>seasons</h1>
              {/* <Slider {...settings}> */}
              {singleMovie?.seasons?.map((item) => {
                return (
                  <>
                    <div className="col-3">
                      <img
                        src={
                          item?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "https://movix-eta.vercel.app/assets/no-poster-af8294eb.png"
                        }
                      />
                      <div className="firtnth">
                      <h4>{item?.name}</h4>
                      <p>{item?.air_date}</p>
                      </div>
                    </div>
                  </>
                );
              })}
              {/* </Slider> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
  
    </>
  );
};

export default Movie;
