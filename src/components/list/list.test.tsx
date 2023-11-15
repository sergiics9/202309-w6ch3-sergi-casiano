import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../../slices/charactersSlice';
import { AnyCharacter } from '../../models/character';
import { useCharacters } from '../../hooks/useCharacters';

jest.mock('../../hooks/useCharacters');

describe('Given List component ', () => {
  describe('When charactersState is "idle"', () => {
    const mockStore = configureStore({
      reducer: {
        charactersState: charactersReducer,
      },
      preloadedState: {
        charactersState: {
          characters: [{ id: 1 } as AnyCharacter],
          charactersState: 'idle',
        },
      },
    });

    const loadCharacters = jest.fn();
    (useCharacters as jest.Mock).mockReturnValue({
      loadCharacters,
    });

    render(
      <Provider store={mockStore}>
        <List />
      </Provider>
    );

    test('Then it should be in the document', () => {
      const listElement = screen.getAllByRole('list')[0];
      expect(listElement).toBeInTheDocument();
      expect(loadCharacters).toHaveBeenCalled();
    });
  });
});
