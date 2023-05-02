import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente "NotFound"', () => {
  it('verifica se é renderizada corretamente quando a página NotFound deve ser exibida', () => {
    renderWithRouter(<NotFound />);

    screen.getByRole('heading', { name: /page requested not found/i });
    const pikachuGIF = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(pikachuGIF).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
