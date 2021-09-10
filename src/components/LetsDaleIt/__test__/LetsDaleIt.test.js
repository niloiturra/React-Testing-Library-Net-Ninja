import { render, screen } from '@testing-library/react';
import LetsDalIt from '../LetsDaleIt';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const MockLetsDaleIt = () => {
  return (
    <BrowserRouter>
      <LetsDalIt />
    </BrowserRouter>
  );
};

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText('Adicionar uma nova tarefa');

  userEvent.click(inputElement);
  userEvent.type(inputElement, 'Vamo de teste porra');

  const comboBoxSelect = screen.getByRole('combobox');
  const firstOption = screen.getByRole('option', {
    name: /Importante & Urgente/i,
  });

  userEvent.selectOptions(comboBoxSelect, firstOption);

  const buttonElement = screen.getByRole('button', { name: '+' });
  userEvent.click(buttonElement);

  tasks.forEach((task) => {
    userEvent.type(inputElement, task);
    userEvent.click(buttonElement);
  });
};

it('should be able to type into input', () => {
  render(<MockLetsDaleIt />);
  addTask(['Go Grocery Shopping']);
  const divElement = screen.getByText(/Go Grocery Shopping/i);
  expect(divElement).toBeInTheDocument();
});

it('should render multiple items', () => {
  render(<MockLetsDaleIt />);
  addTask([
    'Go Grocery Shopping',
    'Go Grocery Shopping',
    'Go Grocery Shopping',
  ]);

  const divElements = screen.queryAllByText(/Go Grocery Shopping/i);

  divElements.forEach((div) => {
    expect(div.parentElement.parentElement).toHaveClass('tasks-red');
  });

  expect(divElements.length).toBe(3);
});

it('task should not have complete class when initally rendered', () => {
  render(<MockLetsDaleIt />);

  addTask(['Go Grocery Shopping']);
  const divElement = screen.getByText(/Go Grocery Shopping/i);
  expect(divElement).not.toHaveClass('task-item-active');
});

it('task should have complete class when clicked', () => {
  render(<MockLetsDaleIt />);

  addTask(['Go Grocery Shopping']);
  const divElement = screen.getByText(/Go Grocery Shopping/i);
  userEvent.click(divElement);
  expect(divElement).toHaveClass('task-item-active');
});

it('task should not have complete class when clicked', () => {
  render(<MockLetsDaleIt />);

  addTask(['Go Grocery Shopping']);
  const divElement = screen.getByText(/Go Grocery Shopping/i);
  userEvent.dblClick(divElement);

  expect(divElement).not.toHaveClass('task-item-active');
});
