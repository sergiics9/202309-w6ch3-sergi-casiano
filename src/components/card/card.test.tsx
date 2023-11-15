import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Card } from './card';
import { AnyCharacter } from '../../models/character';

describe('Given...', () => {
  describe('When we instantiate', () => {
    const character = {
      id: 1,
      name: 'bronn',
      family: 'Some Family',
      age: 30,
      isAlive: true,
      category: 'fighter',
      reignYears: 5,
      weapon: 'Sword',
      adviseTo: { name: 'King' },
      servesTo: { name: 'Queen' },
    };

    render(
      <Provider store={store}>
        <Card character={character as unknown as AnyCharacter} />
      </Provider>
    );

    test('It should be in the document', () => {
      const element = screen.getByText('bronn Some Family');
      expect(element).toBeInTheDocument();

      const image = screen.getByAltText('bronn Some Family');
      expect(image).toBeInTheDocument();

      const ageElement = screen.getByText('Edad: 30 años');
      expect(ageElement).toBeInTheDocument();

      const reignYearsElement = screen.getByText('Años de reinado: 5');
      expect(reignYearsElement).toBeInTheDocument();

      const deadButton = screen.getByText('muere');
      expect(deadButton).toBeInTheDocument();
    });
  });
});

describe('Given...', () => {
  describe('When we instantiate', () => {
    test('It should be in the document', () => {
      const character = {
        id: 1,
        name: 'bronn',
        family: 'Some Family',
        age: 30,
        isAlive: true,
        category: 'fighter',
        weapon: 'Sword',
        adviseTo: { name: 'King' },
        servesTo: { name: 'Queen' },
      };

      render(
        <Provider store={store}>
          <Card character={character as unknown as AnyCharacter} />
        </Provider>
      );

      const weaponElement = screen.getByText('Arma: Sword');
      expect(weaponElement).toBeInTheDocument();
    });
  });
});

describe('Given...', () => {
  describe('When we instantiate', () => {
    test('It should be in the document', () => {
      const character = {
        id: 1,
        name: 'bronn',
        family: 'Some Family',
        age: 30,
        isAlive: true,
        category: 'adviser',
        adviseTo: { name: 'King' },
        servesTo: { name: 'Queen' },
      };

      render(
        <Provider store={store}>
          <Card character={character as unknown as AnyCharacter} />
        </Provider>
      );

      const adviseToElement = screen.getByText('Sirve a: King');
      expect(adviseToElement).toBeInTheDocument();
    });
  });
});

describe('Given...', () => {
  describe('When we instantiate', () => {
    test('It should be in the document', () => {
      const character = {
        id: 1,
        name: 'bronn',
        family: 'Some Family',
        age: 30,
        isAlive: false,
        category: 'adviser',

        servesTo: { name: 'Queen' },
      };

      render(
        <Provider store={store}>
          <Card character={character as unknown as AnyCharacter} />
        </Provider>
      );
      const servesToElement = screen.getByText('Asesora a: Queen');
      expect(servesToElement).toBeInTheDocument();
    });
  });

  describe('Given...', () => {
    describe('When the character category is "king"', () => {
      test('It should return the king emoji', () => {
        const character = {
          id: 1,
          name: 'bronn',
          family: 'Some Family',
          age: 30,
          isAlive: true,
          category: 'king',
          reignYears: 5,
        };

        render(
          <Provider store={store}>
            <Card character={character as unknown as AnyCharacter} />
          </Provider>
        );

        const emojiElement = screen.getByText('👑');
        expect(emojiElement).toBeInTheDocument();
      });
    });
  });
  describe('Given...', () => {
    describe('When the character is dead', () => {
      test('It should return the the isAlive false', () => {
        const character = {
          id: 1,
          name: 'bronn',
          family: 'Some Family',
          age: 30,
          isAlive: false,
          category: 'king',
          reignYears: 5,
        };

        render(
          <Provider store={store}>
            <Card character={character as unknown as AnyCharacter} />
          </Provider>
        );

        const emojiElement = screen.getAllByRole('generic')[1];
        expect(emojiElement).toBeInTheDocument();
      });
    });
  });
});
