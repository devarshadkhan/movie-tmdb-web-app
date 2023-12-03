import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const CircleRating = ({ rating }) => {
    const percentage = 66;

    return (
      <>
          <div className="circleRating">
            {/* <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            /> */}
            <CircularProgressbar value={percentage} text={`${percentage}%`} />

        </div>
      </>
    );
};

export default CircleRating;
