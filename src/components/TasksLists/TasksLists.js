import React from 'react';
import { taskListColorsEnum } from './taskListColorsEnum';
import TaskListFooter from '../TaskListFooter/TaskListFooter';
import './TasksLists.css';

function TasksLists({ tasks, setTasks }) {
  const handleCompleteTask = (id, color) => {
    let updatedTasks = tasks[color].map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }

      return task;
    });

    let newStateTasks = {
      ...tasks,
      updatedTasks,
    };

    setTasks(newStateTasks);
  };

  const calcNumberOfIncompletedTasks = (color) => {
    let count = 0;
    tasks[color].forEach((task) => {
      if (!task.completed) count++;
    });
    return count;
  };

  return (
    <div className="tasklist-parent-container">
      <div className="tasklist-container tasks-red">
        <div className="tasklist">
          {tasks.red &&
            tasks.red.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed && 'task-item-active'}`}
                onClick={() =>
                  handleCompleteTask(task.id, taskListColorsEnum.RED)
                }
              >
                {task.name}
              </div>
            ))}
        </div>
        <div>
          <TaskListFooter
            numberOfIncompleteTasks={calcNumberOfIncompletedTasks(
              taskListColorsEnum.RED
            )}
          />
        </div>
      </div>

      <div className="tasklist-container tasks-green">
        <div className="tasklist">
          {tasks.green &&
            tasks.green.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed && 'task-item-active'}`}
                onClick={() =>
                  handleCompleteTask(task.id, taskListColorsEnum.GREEN)
                }
              >
                {task.name}
              </div>
            ))}
        </div>
        <div>
          <TaskListFooter
            numberOfIncompleteTasks={calcNumberOfIncompletedTasks(
              taskListColorsEnum.GREEN
            )}
          />
        </div>
      </div>

      <div className="tasklist-container tasks-orange">
        <div className="tasklist">
          {tasks.orange &&
            tasks.orange.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed && 'task-item-active'}`}
                onClick={() =>
                  handleCompleteTask(task.id, taskListColorsEnum.ORANGE)
                }
              >
                {task.name}
              </div>
            ))}
        </div>
        <div>
          <TaskListFooter
            numberOfIncompleteTasks={calcNumberOfIncompletedTasks(
              taskListColorsEnum.ORANGE
            )}
          />
        </div>
      </div>

      <div className="tasklist-container tasks-yellow">
        <div className="tasklist">
          {tasks.yellow &&
            tasks.yellow.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed && 'task-item-active'}`}
                onClick={() =>
                  handleCompleteTask(task.id, taskListColorsEnum.YELLOW)
                }
              >
                {task.name}
              </div>
            ))}
        </div>
        <div>
          <TaskListFooter
            numberOfIncompleteTasks={calcNumberOfIncompletedTasks(
              taskListColorsEnum.YELLOW
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksLists;
