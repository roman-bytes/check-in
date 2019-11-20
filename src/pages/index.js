import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Activity from "../components/activity";
import SEO from "../components/seo";
import uuid from "uuid";
import "./index.css";

const IndexPage = () => {
  const sessionTasks = sessionStorage.getItem("tasks");
  const [tasks, setTasks] = useState(
    sessionTasks ? JSON.parse(sessionTasks) : []
  );
  const descInput = React.createRef();
  const getAllTheData = task => {
    // Find current task and "update"
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
      <SEO title="Check-in App" lang="en" />
      <div className="start-task">
        What are you going to work on today?{" "}
        <span role="img" aria-label="man working on computer">
          👨‍💻
        </span>{" "}
        <br />
        <br />
        <label>
          Description:
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
      </div>
      <Activity tasks={tasks} getData={getAllTheData} />
    </Layout>
  );
};

export default IndexPage;
