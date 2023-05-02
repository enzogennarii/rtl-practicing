import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testa o comportamento da página de Pokémons favoritos', () => {
  it('verifica se inicialmente, sem pokémons favoritados, a página renderiza corretamente', () => {
    renderWithRouter(<FavoritePokemon />);

    screen.getByRole('heading', { name: /favorite pokémon/i });
    screen.getByText(/no favorite pokémon found/i);
  });

  it('favorita um pokémon e verifica se na página de favoritos, contém somente o que foi favoritado', () => {
    renderWithRouter(<App />);

    const btnTypeFire = screen.getByRole('button', { name: /fire/i });
    expect(btnTypeFire).toBeInTheDocument();
    userEvent.click(btnTypeFire);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);

    const charmanderName = screen.getByText(/charmander/i);
    expect(charmanderName).toBeInTheDocument();
  });
});
