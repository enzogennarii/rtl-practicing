import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente App', () => {
  it('verifica se os links de navegação da página são renderizados corretamente', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', { name: /home/i });
    screen.getByRole('link', { name: /about/i });
    screen.getByRole('link', { name: /favorite pokémon/i });
  });

  it('verifica se ao clicar em "Home", é redirecionado para a página correta', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('verifica se ao clicar em "About", é redirecionado para a página correta', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('verifica se ao clicar em "Pokémon Favoritados", é redirecionado para a página correta', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('verifica se ao ser redirecionada para um URL desconhecida, renderiza a página correta', () => {
    const { history } = renderWithRouter(<App />);

    const notFoundURL = '/url-desconhecida';
    act(() => {
      history.push(notFoundURL);
    });

    screen.getByRole('heading', { name: /page requested not found/i });
  });
});
