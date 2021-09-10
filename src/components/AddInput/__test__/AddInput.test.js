import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddInput from '../AddInput';

const mockedSetTodo = jest.fn();

describe('input', () => {
  it('quero a input', () => {
    render(<AddInput />);
    const defaultText = screen.getByPlaceholderText(
      'Adicionar uma nova tarefa'
    );
    expect(defaultText).toBeInTheDocument();
  });

  it('quero escrever no input', () => {
    render(<AddInput />);

    const value = '1';
    const input = screen.getByRole('textbox');

    userEvent.click(input);
    userEvent.type(input, value);

    expect(input.value).toBe(value);
  });

  it('quero ver um combox com opções de tarefas', () => {
    render(<AddInput />);

    const combobox = screen.getByRole('combobox');

    expect(combobox).toBeInTheDocument();
  });

  it('quero selecionar uma opção de tarefa', () => {
    render(<AddInput />);
    const combobox = screen.getByRole('combobox');
    const opcaoImportanteEUrgente = screen.getByRole('option', {
      name: 'Importante & Urgente',
    });
    userEvent.selectOptions(combobox, opcaoImportanteEUrgente);
    expect(opcaoImportanteEUrgente.selected).toBeTruthy();
  });

  it('quero ver um botão', () => {
    render(<AddInput />);
    const button = screen.getByText('+');
    expect(button).toBeInTheDocument();
  });

  it('quero que o botão esteja desabilitado inicialmente', () => {
    render(<AddInput />);
    const button = screen.getByRole('button');
    expect(button.enable).toBeFalsy();
  });

  it('quero que o botão seja desabilitado quando nao selecionar nada', () => {
    render(<AddInput />);
    const combobox = screen.getByRole('combobox');
    const opcaoZero = screen.getByRole('option', {
      name: 'Selecione um quadro...',
    });
    userEvent.selectOptions(combobox, opcaoZero);
    const button = screen.getByRole('button');
    expect(button.enable).toBeFalsy();
  });

  it('quero que o botão seja habilitado quando selecionar algo', () => {
    render(<AddInput />);
    const combobox = screen.getByRole('combobox');
    const opcaoOne = screen.getByRole('option', {
      name: 'Importante & Urgente',
    });
    userEvent.selectOptions(combobox, opcaoOne);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('Quero que seja limpo o campo de texto ao adicionar a o item', () => {
    render(<AddInput />);
    const value = '1';
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    userEvent.click(input);
    userEvent.type(input, value);

    const combobox = screen.getByRole('combobox');
    const opcaoOne = screen.getByRole('option', {
      name: 'Importante & Urgente',
    });
    userEvent.selectOptions(combobox, opcaoOne);
    userEvent.click(button);

    expect(input.value).toBe('');
  });

  it('Ao clicar no botão, quero que seja chamado a função addTask', async () => {
    render(<AddInput tasks={[]} setTasks={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(
      'Adicionar uma nova tarefa'
    );

    await userEvent.click(inputElement);
    await userEvent.type(inputElement, 'Vamo de teste');

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
});
