import { Icons } from '@pkmn/img';
import { useSyncedStore } from '@syncedstore/react';
import React, { useContext } from 'react';

import { StoreContext } from '@/components/workspace/StoreContext';
import { Pokemon } from '@/models/Pokemon';
import { AppConfig } from '@/utils/AppConfig';
import { convertStylesStringToObject } from '@/utils/Helpers';

function TabsSwitcher() {
  const { teamStore, tabIdx, setTabIdx, setFocusedField } = useContext(StoreContext);
  const teamState = useSyncedStore(teamStore);

  const newTab = () => {
    const newLen = teamState.team.push(new Pokemon('Bulbasaur'));
    setTabIdx(newLen - 1);
    setFocusedField({ Species: 0 });
  };

  const removeTab = (index: number) => {
    const newTeam = teamState.team.splice(index, 1);
    setTabIdx(newTeam.length - 1);
  };

  return (
    <div className="tabs tabs-boxed">
      {teamState.team.map((p, i) => (
        <div key={p.id} className="indicator">
          <span className="badge indicator-item badge-secondary" onClick={() => removeTab(i)}>
            ×
          </span>
          <a className={`tab tab-lifted tab-md md:tab-lg ${i === tabIdx ? 'tab-active' : ''}`} onClick={() => setTabIdx(i)}>
            <span style={convertStylesStringToObject(Icons.getPokemon(p.species).style)}></span>
            {p.species}
          </a>
        </div>
      ))}
      {teamState.team.length < AppConfig.maxPokemonPerTeam && (
        <button className="tab tab-lifted tab-active tab-md md:tab-lg" onClick={() => newTab()}>
          +
        </button>
      )}
    </div>
  );
}

export default TabsSwitcher;
