import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente "PokemonDetails"', () => {
  it('verifica se as informações de detalhe do Pokémon são exibidas na tela', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    screen.getByText(/pikachu details/i);

    screen.getByRole('heading', { name: /summary/i });
    screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    screen.getByRole('heading', { name: /game locations of pikachu/i });
    const locations = screen.getAllByAltText(/pikachu location/i);
    expect(locations).toHaveLength(2);
    screen.getByText(/kanto viridian forest/i);
    screen.getByText(/kanto power plant/i);
    expect(locations[0]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('verifica o funcionamento de favoritar Pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFavorite);

    const favoritesPage = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritesPage);

    screen.getByText(/pikachu/i);
  });
});
