import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../services/api.repo';
import { AnyCharacter } from '../models/character';

export const loadCharactersThunk = createAsyncThunk<AnyCharacter[], ApiRepo>(
  'tasks/load',
  async (repo) => {
    const tasks = await repo.getCharacters();
    return tasks;
  }
);

export const updateCharactersThunk = createAsyncThunk<
  AnyCharacter,
  {
    repo: ApiRepo;
    id: AnyCharacter['id'];
    updatedTask: Partial<AnyCharacter>;
  }
>('tasks/update', async ({ repo, id, updatedTask }) => {
  const finalTask = await repo.updateCharacter(id, updatedTask);
  return finalTask;
});

// => {
// type:  'tasks/load'
// payload: tasks
// }

// type Params = {
//   repo: ApiRepoTasks;
//   newTask: Partial<Task>;
// };

// export const createTaskThunk = createAsyncThunk<Task, Params>(
//   'tasks/create',
//   async ({ repo, newTask }) => {
//     const finalTask = await repo.createTask(newTask);
//     return finalTask;
//   }
// );

// export const deleteTaskThunk = createAsyncThunk<
//   Task['id'],
//   {
//     repo: ApiRepoTasks;
//     id: Task['id'];
//   }
// >('tasks/delete', async ({ repo, id }) => {
//   await repo.deleteTask(id);
//   return id;
// });
