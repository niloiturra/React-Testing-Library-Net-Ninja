import React, { useState } from 'react';
import './AddInput.css';
import { taskListColorsEnum } from '../TasksLists/taskListColorsEnum';
import { v4 } from 'uuid';

function AddInput({ setTasks, tasks }) {
  const [task, setTask] = useState('');
  const [color, setColor] = useState('-');

  const addTask = () => {
    if (!tasks) {
      setTask('');
      return;
    }

    if (!tasks[color]) {
      tasks[color] = [];
    }

    let updatedTasks = {
      ...tasks,
      [color]: [
        ...tasks[color],
        {
          id: v4(),
          name: task || 'Tarefa Genérica',
          completed: false,
        },
      ],
    };

    setTasks(updatedTasks);
    setTask('');
  };

  return (
    <div className="input-container">
      {/* componente de selecao INICIO */}
      {/* componente de selecao FIM */}

      {/* componente de insercao INICIO */}
      {/* componente de insercao FIM */}

      {/* componente de botao INICIO */}
      {/* componente de botao FIM */}
    </div>
  );
}

export default AddInput;
