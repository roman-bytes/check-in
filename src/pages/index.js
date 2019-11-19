import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Activity from "../components/activity";
import uuid from "uuid";
import "./index.css";

const IndexPage = () => {
  const sessionTasks = sessionStorage.getItem("tasks");
  const [tasks, setTasks] = useState(sessionTasks ? sessionTasks : []);
  const descInput = React.createRef();
  const getAllTheData = task => {
    console.log("YAY WE GOT THE DATA");
    const removeIndex = tasks.map(t => t.id).indexOf(task.id);
    tasks.splice(removeIndex, 1);

    setTasks([
      ...tasks,
      {
        ...task,
      },
    ]);
  };

  useEffect(() => {
    sessionStorage.setItem("tasks", [JSON.stringify(tasks)]);
  }, [tasks]);

  return (
    <Layout>
      <label>
        Description
        <input type="text" className="desc" ref={descInput} />
      </label>
      <button
        type="button"
        onClick={() => {
          setTasks([
            ...tasks,
            {
              id: uuid(),
              startTime: new Date().getTime(),
              description: descInput.current.value,
            },
          ]);
          descInput.current.value = "";
        }}
      >
        Start Task
      </button>
      <Activity tasks={tasks} getData={getAllTheData} />
    </Layout>
  );
};

export default IndexPage;
