import { render, screen } from '@testing-library/react';
import TaskListFooter from '../TaskListFooter';
import { BrowserRouter } from 'react-router-dom';

const MockTaskListFooter = ({ numberOfIncompleteTasks }) => {
  return (
    <BrowserRouter>
      <TaskListFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
    </BrowserRouter>
  );
};

describe('TaskListFooter', () => {
  it('should render the correct amount of incomplete tasks', () => {
    render(<MockTaskListFooter numberOfIncompleteTasks={5} />);
    const pElement = screen.getByText(/5 tarefas restantes/i);
    expect(pElement).toBeInTheDocument();
  });

  it('should render "task" when the number of incomplete tasks is one', () => {
    render(<MockTaskListFooter numberOfIncompleteTasks={1} />);
    const pElement = screen.getByText(/1 tarefa restante/i);
    expect(pElement).toBeInTheDocument();
  });
});
