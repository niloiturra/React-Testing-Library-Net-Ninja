import React from 'react';
import './TaskListFooter.css';

function TaskListFooter({ numberOfIncompleteTasks }) {
  return (
    <div className="task-list-footer">
      <p>
        {numberOfIncompleteTasks} {numberOfIncompleteTasks > 1 ? `tarefas`: `tarefa`} restantes
      </p>
    </div>
  );
}

export default TaskListFooter;
