import { useSyncedStore } from '@syncedstore/react';
import { ChangeEvent, useEffect, useState } from 'react';

import { teamStore } from '@/store';

function SpeciesInput({ onFocus, tabIdx }: { onFocus: () => void; tabIdx: number }) {
  const teamState = useSyncedStore(teamStore);
  const [species, setSpecies] = useState<string>('Pikachu');

  // receive changes from other users
  useEffect(() => {
    if (!teamState.team[tabIdx]) return;
    setSpecies(teamState.team[tabIdx]?.species || 'Pikachu');
  }, [teamState.team[tabIdx]?.species]);

  // emit changes to other users
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSp = e.target.value;
    // setSpecies(newSp);
    if (!teamState.team[tabIdx]) return;
    // @ts-ignore
    teamState.team[tabIdx].species = newSp;
  };

  return (
    <div className="tooltip" data-tip="Please pick Pokémon below">
      <label className="input-group-xs input-group input-group-vertical">
        <span>Species</span>
        <input
          type="text"
          placeholder="Species"
          className="input-primary input input-sm md:input-md"
          value={species}
          onFocus={onFocus}
          onChange={handleChange}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
        />
      </label>
    </div>
  );
}

export default SpeciesInput;
