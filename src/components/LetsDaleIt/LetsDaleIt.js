import React, { useState } from 'react';
import AddInput from '../AddInput/AddInput';
import Header from '../Header/Header';
import TasksLists from '../TasksLists/TasksLists';
import './LetsDaleIt.css';

function LetsDaleIt() {
  const [tasks, setTasks] = useState({
    red: [],
    green: [],
    orange: [],
    yellow: [],
  });

  return (
    <div className="letsDaleIt">
      <Header title="Let's DalIt" />
      <AddInput setTasks={setTasks} tasks={tasks} />
      <TasksLists setTasks={setTasks} tasks={tasks} />
    </div>
  );
}

export default LetsDaleIt;
