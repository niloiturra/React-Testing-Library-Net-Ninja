import { render, screen } from '@testing-library/react';
import Header from '../Header';
describe("Header", () => {
    it("Ah eu quero que o titulo da pagina esteja renderizando", () => {
        render(<Header/>);
        const h1 = screen.getByText("Let's dalit");
        expect(h1).toBeInTheDocument()
    });
});