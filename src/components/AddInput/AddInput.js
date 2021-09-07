import React, { useState } from 'react';
import './AddInput.css';
import { taskListColorsEnum } from '../TasksLists/taskListColorsEnum';
import { v4 } from 'uuid';

function AddInput({ setTasks, tasks }) {
  const [task, setTask] = useState('');
  const [color, setColor] = useState('-');

  const addTask = () => {
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
      <select
        name="colors"
        className="custom-select"
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="-">Selecione um quadro...</option>
        <option value={taskListColorsEnum.RED}>Importante & Urgente</option>
        <option value={taskListColorsEnum.GREEN}>
          Importante & Não Urgente
        </option>
        <option value={taskListColorsEnum.ORANGE}>Delegar</option>
        <option value={taskListColorsEnum.YELLOW}>Excluir</option>
      </select>

      <input
        className="input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Adicionar uma nova tarefa"
      />

      <button className="add-btn" onClick={addTask} disabled={color === '-'}>
        Add
      </button>
    </div>
  );
}

export default AddInput;
