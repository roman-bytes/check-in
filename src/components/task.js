import React, { useEffect, useState } from "react";
import Time from "react-time";
import ms from "pretty-ms";

function Task({ id, startTime, endTime, description, duration, getData }) {
  const stopTimer = () => {
    setTimerOn(false);
    setDurationCounter(0);
    setShowClockOut(false);
  };

  const [durationCounter, setDurationCounter] = useState(0);
  const [isTimerOn, setTimerOn] = useState(true);
  const [showClockOut, setShowClockOut] = useState(true);
  useEffect(() => {
    let interval = null;
    if (isTimerOn) {
      interval = setInterval(() => {
        setDurationCounter(durationCounter => durationCounter + 1000);
      }, 1000);
    } else if (!isTimerOn && durationCounter !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerOn, durationCounter]);

  return (
    <div className="task">
      <div className="start time">
        <div>Start Time</div>
        <Time value={startTime} format="HH:mm:ss" />
      </div>
      <div className="stop time">
        <div>End Time</div>
        {endTime ? <Time value={endTime} format="HH:mm:sss" /> : "--:--:--"}
      </div>
      <div className="duration">
        <div>Duration</div>
        {isTimerOn ? ms(durationCounter) : ms(duration)}
      </div>
      <div className="description">{description}</div>
      {showClockOut && (
        <div className="clock-out">
          <button
            type="button"
            onClick={() => {
              getData({
                id: id,
                startTime: startTime,
                endTime: new Date().getTime(),
                description: description,
                duration: durationCounter,
              });
              stopTimer();
            }}
          >
            Clock out
          </button>
        </div>
      )}
    </div>
  );
}

export default Task;
