import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página da rota "About"', () => {
  it('verifica se a página é renderizada corretamente', () => {
    renderWithRouter(<About />);

    screen.getByRole('heading', { name: /about pokédex/i });
    screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imgPokedex).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
