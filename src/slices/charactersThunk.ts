import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../services/api.repo';
import { AnyCharacter } from '../models/character';

export const loadCharactersThunk = createAsyncThunk<AnyCharacter[], ApiRepo>(
  'characters/load',
  async (repo) => {
    const characters = await repo.getCharacters();
    return characters;
  }
);

export const updateCharactersThunk = createAsyncThunk<
  AnyCharacter,
  {
    repo: ApiRepo;
    id: AnyCharacter['id'];
    updateCharacters: Partial<AnyCharacter>;
  }
>('characters/update', async ({ repo, id, updateCharacters }) => {
  const finalCharacters = await repo.updateCharacter(id, updateCharacters);
  return finalCharacters;
});
