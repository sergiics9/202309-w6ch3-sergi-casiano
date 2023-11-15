import { useEffect } from 'react';
import { Card } from '../card/card';
import { useCharacters } from '../../hooks/useCharacters';
import '../../main.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export function List() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersState
  );
  const { loadCharacters } = useCharacters();

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  // if (charactersState === 'loading') {
  //   return <p className="loading">Loading</p>;
  // }

  // if (charactersState === 'error') {
  //   return <p>Error loading tasks</p>;
  // }

  return (
    <ul className="characters-list row list-unstyled">
      {characters.map((item) => (
        <Card key={item.name} character={item}></Card>
      ))}
    </ul>
  );
}
