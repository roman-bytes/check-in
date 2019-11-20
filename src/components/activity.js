import React, { Fragment } from "react";
import Task from "./task";

function Activity({ tasks, getData }) {
  const listTasks = tasks.map((item, key) => {
    return (
      <Task
        key={key}
        index={key}
        id={item.id}
        startTime={item.startTime}
        endTime={item.endTime}
        description={item.description}
        duration={item.duration}
        getData={getData}
      />
    );
  });

  return (
    <Fragment>
      {tasks.length ? (
        <div className="activity-wrap">
          <h2>
            Activity{" "}
            <span role="img" aria-label="News paper">
              📰
            </span>
          </h2>
          {listTasks}
        </div>
      ) : null}
    </Fragment>
  );
}

export default Activity;
