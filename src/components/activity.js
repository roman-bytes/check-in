import React, { Fragment } from "react";
import Task from "./task";

function Activity({ tasks, getData }) {
  console.log("tasks-activity", tasks);

  const listTasks = tasks.map((item, key) => {
    return (
      <Task
        key={key}
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
      {tasks.length && (
        <div className="activity-wrap">
          <h2>Activity</h2>
          {listTasks}
        </div>
      )}
    </Fragment>
  );
}

export default Activity;
