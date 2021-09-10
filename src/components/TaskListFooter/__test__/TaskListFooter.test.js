import { render, screen } from '@testing-library/react';
import TaskListFooter from '../TaskListFooter';
import { BrowserRouter } from 'react-router-dom';

describe("TaskListFooter", () => {

    it("Quero ver quantas tarefas tem adicionadas", () => {
        const qty = 2;
        render(<TaskListFooter numberOfIncompleteTasks={qty} />);
        expect(screen.getByText(`${qty} tarefas restantes`)).toBeInTheDocument();
    })

    it("Quero ver quantas tarefa tem adicionadas no singular", () => {
        const qty = 1;
        render(<TaskListFooter numberOfIncompleteTasks={qty} />);
        expect(screen.getByText(`${qty} tarefa restantes`)).toBeInTheDocument();
    })

})