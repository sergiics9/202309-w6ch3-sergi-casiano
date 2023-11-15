import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnyCharacter } from '../models/character';
import { loadCharactersThunk, updateCharactersThunk } from './charactersThunk';

type CharactersState = {
  characters: AnyCharacter[];
  charactersState: 'idle' | 'loading' | 'error';
};

const initialState: CharactersState = {
  characters: [],
  charactersState: 'idle',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCharactersThunk.pending, (state: CharactersState) => {
      state.charactersState = 'loading';
      return state;
    }),
      builder.addCase(
        loadCharactersThunk.fulfilled,
        (
          state: CharactersState,
          { payload }: PayloadAction<AnyCharacter[]>
        ) => {
          state.characters = payload;
          state.charactersState = 'idle';
          return state;
        }
      ),
      builder.addCase(
        loadCharactersThunk.rejected,
        (state: CharactersState) => {
          state.charactersState = 'error';
          return state;
        }
      ),
      builder.addCase(
        updateCharactersThunk.fulfilled,
        (state: CharactersState, { payload }: PayloadAction<AnyCharacter>) => {
          state.characters[
            state.characters.findIndex((item) => item.id === payload.id)
          ] = payload;
          return state;
        }
      );
  },
});

export default charactersSlice.reducer;
