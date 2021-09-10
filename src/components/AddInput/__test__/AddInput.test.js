import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddInput from '../AddInput';

const mockedSetTodo = jest.fn();

describe('AddInput', () => {
  it('should render input element', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(
      'Adicionar uma nova tarefa'
    );

    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type into input', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(
      'Adicionar uma nova tarefa'
    );

    userEvent.click(inputElement);
    userEvent.type(inputElement, 'Vamo de teste porra');

    expect(inputElement.value).toBe('Vamo de teste porra');
  });

  it('should be able to add task in input', async () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(
      'Adicionar uma nova tarefa'
    );

    await userEvent.click(inputElement);
    await userEvent.type(inputElement, 'Vamo de teste porra');

    const comboBoxSelect = screen.getByRole('combobox');
    const firstOption = screen.getByRole('option', {
      name: /Importante & Urgente/i,
    });

    await userEvent.selectOptions(comboBoxSelect, firstOption);

    const buttonElement = screen.getByRole('button', { name: '+' });
    await userEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedSetTodo).toBeCalled();
    });
  });

  it('should have empty input when add button is clicked', async () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(
      'Adicionar uma nova tarefa'
    );

    await userEvent.type(inputElement, 'Vamo de teste porra');

    const comboBoxSelect = screen.getByRole('combobox');
    const firstOption = screen.getByRole('option', {
      name: /Importante & Urgente/i,
    });

    await userEvent.selectOptions(comboBoxSelect, firstOption);

    const buttonElement = screen.getByRole('button', { name: '+' });
    await userEvent.click(buttonElement);

    await waitFor(() => {
      expect(inputElement.value).toBe('');
    });
  });
});

describe('Select options for boxes', () => {
  it('should render select component', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const comboBoxSelect = screen.getByRole('combobox');

    expect(comboBoxSelect).toBeInTheDocument();
  });

  it('should select an option', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const comboBoxSelect = screen.getByRole('combobox');
    const firstOption = screen.getByRole('option', {
      name: /Selecione um quadro.../i,
    });

    userEvent.selectOptions(comboBoxSelect, firstOption);

    expect(firstOption.selected).toBeTruthy();
  });
});

describe('Render button', () => {
  it('should render input disabled', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const buttonElement = screen.getByRole('button', { name: '+' });

    expect(buttonElement).toBeDisabled();
  });

  it('should not enabled button after selected combobox with Selecione um quadro...', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const buttonElement = screen.getByRole('button', { name: '+' });
    const comboBoxSelect = screen.getByRole('combobox');
    const firstOption = screen.getByRole('option', {
      name: /Selecione um quadro.../i,
    });

    userEvent.selectOptions(comboBoxSelect, firstOption);

    expect(buttonElement).toBeDisabled();
  });

  it('should enabled button after selected combobox', () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const buttonElement = screen.getByRole('button', { name: '+' });
    const comboBoxSelect = screen.getByRole('combobox');
    const firstOption = screen.getByRole('option', {
      name: /Importante & Urgente/i,
    });

    userEvent.selectOptions(comboBoxSelect, firstOption);

    expect(buttonElement).toBeEnabled();
  });
});
