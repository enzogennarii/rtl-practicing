import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente "Pokedex"', () => {
  it('verifica se contém o título correto na página', () => {
    renderWithRouter(<App />);
    screen.getByRole('heading', { name: /encountered pokémon/i });
  });

  it('testa o botão "Próximo Pokémon", vendo se é exibido um por vez e se o botão de limpar os filtros está sempre na tela', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);

    screen.getByText(/pikachu/i);
    screen.getByRole('button', { name: /all/i });

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(btnNextPokemon).toBeInTheDocument();

    const listPokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    listPokemons.forEach((pokemon) => {
      userEvent.click(btnNextPokemon);
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
      screen.getByText(pokemon);
      screen.getByRole('button', { name: /all/i });
    });
  });

  it('verifica se os botões de filtro da Pokédex estão todos na tela', () => {
    renderWithRouter(<App />);

    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    pokemonTypes.forEach((type) => {
      screen.getByRole('button', { name: type });
    });

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(7);
  });

  // it('verifica se ao clicar em um botão de filtro, são exibidos somente Pokémon do tipo clicado', () => {
  //   renderWithRouter(<App />);


  // });
});
