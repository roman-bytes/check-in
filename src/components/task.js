import React, { useEffect, useState } from "react";
import Time from "react-time";
import ms from "pretty-ms";

function Task({
  index,
  id,
  startTime,
  endTime,
  description,
  duration = 0,
  getData,
}) {
  const stopTimer = () => {
    setTimerOn(false);
    setDurationCounter(0);
    setShowClockOut(false);
  };

  const [durationCounter, setDurationCounter] = useState(0);
  const [isTimerOn, setTimerOn] = useState(false);
  const [showClockOut, setShowClockOut] = useState(true);
  useEffect(() => {
    let interval = null;
    if (!endTime) {
      // Only start timer for new tasks
      setTimerOn(true);
    }
    if (isTimerOn) {
      interval = setInterval(() => {
        setDurationCounter(durationCounter => durationCounter + 1000);
      }, 1000);
    } else if (!isTimerOn && durationCounter !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [setTimerOn, durationCounter, endTime, isTimerOn]);

  return (
    <div className={isTimerOn ? "active-timer task" : "task"}>
      <div className="clock-out">
        {showClockOut ? (
          <button
            aria-label={`Stop task - ${description}`}
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
            Stop task
          </button>
        ) : (
          <div>{`Task: ${index + 1}`}</div>
        )}
      </div>
      <div className="start time">
        <div>Start Time</div>
        <Time value={startTime} format="hh:mm:ss" />
      </div>
      <div className="stop time">
        <div>End Time</div>
        {endTime ? <Time value={endTime} format="hh:mm:sss" /> : "--:--:--"}
      </div>
      <div className="duration">
        <div>Duration</div>
        {isTimerOn ? ms(durationCounter) : ms(duration)}
      </div>
      <div className="description">
        <div>Description</div>
        {description}
      </div>
    </div>
  );
}

export default Task;
