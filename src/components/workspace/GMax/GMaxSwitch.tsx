import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { DexContext } from '@/components/workspace/Contexts/DexContext';
import { StoreContext } from '@/components/workspace/Contexts/StoreContext';

function GMaxSwitch() {
  const { teamState, tabIdx } = useContext(StoreContext);
  // get dex
  const { gen } = useContext(DexContext);

  const [checked, setChecked] = useState(false);

  // receive changes from other users
  useEffect(() => {
    if (!teamState.getPokemonInTeam(tabIdx)) return;
    setChecked(teamState.getPokemonInTeam(tabIdx)?.gigantamax || false);
  }, [teamState.getPokemonInTeam(tabIdx)?.gigantamax]);

  // emit changes to other users
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    teamState.updatePokemonInTeam(tabIdx, 'gigantamax', e.target.checked);
  };

  const { canGigantamax } = gen.species.get(teamState.getPokemonInTeam(tabIdx)?.species ?? '') ?? {};
  if (!canGigantamax) return null;

  return (
    <div className="md:text-md flex inline-flex space-x-0.5 text-xs">
      <label>GMax</label>
      <div className="whitespace-nowrap">
        <label className="swap swap-flip">
          <input type="checkbox" checked={checked} onChange={(e) => handleChange(e)} />
          <span className="swap-on">🌟</span>
          <span className="swap-off">✖️</span>
        </label>
      </div>
    </div>
  );
}

export default GMaxSwitch;
