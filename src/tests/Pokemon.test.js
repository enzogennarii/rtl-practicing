import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente "Pokemon"', () => {
  it('verifica se as informações presentes no card do Pokémon são renderizadas como esperado', () => {
    renderWithRouter(<App />);

    screen.getByText(/pikachu/i);
    screen.getByText(/average weight: 6.0 kg/i);
    expect(screen.getAllByText(/electric/i)).toHaveLength(2);
    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuImg).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('verifica se o card contém um link de mais detalhes para o Pokémon exibido', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    const rightEndURL = moreDetailsLink.href.endsWith('/pokemon/25');
    expect(rightEndURL).toBe(true);
  });

  it('verifica se ao clicar no link para mais detalhes, é redirecionado para a página correta', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const pathname = history.location;
    expect(pathname.pathname).toBe('/pokemon/25');
  });

  it('verifica se ao favoritar um Pokémon na página de detalhes, é exibido um ícone de estrela no card', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkboxFavorite).toBeInTheDocument();
    userEvent.click(checkboxFavorite);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src.endsWith('/star-icon.svg')).toBe(true);
  });
});
