import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Activity from "../components/activity";
import SEO from "../components/seo";
import uuid from "uuid";
import "./index.css";

const IndexPage = () => {
  let sessionTasks;
  if (typeof window !== "undefined") {
    sessionTasks = window.sessionStorage.getItem("tasks");
  }
  const [inputError, setInputError] = useState(false);
  const [activeError, setAlreadyActiveError] = useState(false);
  const [tasks, setTasks] = useState(
    sessionTasks ? JSON.parse(sessionTasks) : []
  );
  const descInput = React.createRef();
  const addTask = () => {
    const emptyVal = descInput.current.value;
    const activateTask = document.querySelector(".active-timer");
    if (!emptyVal) {
      setInputError(true);
      return;
    }
    if (activateTask) {
      setInputError(false);
      setAlreadyActiveError(true);
      return;
    }
    setTasks([
      ...tasks,
      {
        id: uuid(),
        startTime: new Date().getTime(),
        description: descInput.current.value,
      },
    ]);
    descInput.current.value = "";
    setInputError(false);
    setAlreadyActiveError(false);
  };
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
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("tasks", [JSON.stringify(tasks)]);
    }
  }, [tasks]);

  return (
    <Layout>
      <SEO title="Check-in App" lang="en" />
      <div className="start-task">
        What are you going to work on today?{" "}
        <span role="img" aria-label="man working on computer">
          👨‍💻
        </span>
        <br />
        <br />
        {inputError && <div className="error">Please add a description</div>}
        {activeError && (
          <div className="error">
            There is already an active task, please finish the active task
            before starting a new one.
          </div>
        )}
        <label>
          Description:
          <input
            type="text"
            className="desc"
            ref={descInput}
            onKeyPress={e => {
              if (e.which === 13) {
                addTask();
              }
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            addTask();
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
