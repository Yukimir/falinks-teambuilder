import { useContext, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { StoreContext } from '@/components/workspace/Contexts/StoreContext';
import { Pokemon } from '@/models/Pokemon';
import { PokePaste } from '@/models/PokePaste';

const exampleText = `Dog (Zacian-Crowned) @ Rusted Sword  
Ability: Intrepid Sword  
Level: 50  
EVs: 252 Atk / 4 SpD / 252 Spe  
Jolly Nature  
- Behemoth Blade  
- Play Rough  
- Sacred Sword  
- Protect  

Groudon @ Assault Vest  
Ability: Drought  
Level: 50  
EVs: 164 HP / 228 Atk / 4 Def / 100 SpD / 12 Spe  
Adamant Nature  
- Precipice Blades  
- Fire Punch  
- Stone Edge  
- Heavy Slam  

Incineroar @ Shuca Berry  
Ability: Intimidate  
Level: 50  
EVs: 252 HP / 4 Atk / 84 Def / 156 SpD / 12 Spe  
Careful Nature  
- Fake Out  
- Throat Chop  
- Flare Blitz  
- Parting Shot  

Charizard-Gmax @ Life Orb  
Ability: Solar Power  
Level: 50  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Blast Burn  
- Heat Wave  
- Hurricane  
- Protect  

Gastrodon @ Leftovers  
Ability: Storm Drain  
Level: 50  
EVs: 180 HP / 204 Def / 124 SpD  
Bold Nature  
IVs: 0 Atk  
- Earth Power  
- Ice Beam  
- Protect  
- Yawn  

Grimmsnarl (M) @ Light Clay  
Ability: Prankster  
Level: 50  
EVs: 252 HP / 4 Atk / 116 Def / 124 SpD / 12 Spe  
Impish Nature  
- Spirit Break  
- Light Screen  
- Reflect  
- Scary Face  
`;

export function ImportShowdownDialog() {
  const { teamState, tabIdx } = useContext(StoreContext);
  const [single, setSingle] = useState(false);

  const importTextareaRef = useRef<HTMLTextAreaElement>(null);

  const loadExampleHandler = () => {
    if (importTextareaRef.current) {
      importTextareaRef.current.value = exampleText;
    }
  };

  const singleSetHandler = () => {
    setSingle(!single);
  };

  const importHandler = () => {
    const text = importTextareaRef.current?.value ?? '';
    // clear the textarea
    if (importTextareaRef.current) {
      importTextareaRef.current.value = '';
    }
    // check if it's a PokePaste link
    if (PokePaste.isValidPokePasteURL(text)) {
      PokePaste.pokePasteURLFetcher(text)
        .then((data) => {
          const newTeam = data.extractPokemonFromPaste();
          if (!newTeam) {
            toast.error('Invalid team paste fetched from PokePaste');
            return;
          }
          teamState.team.splice(0, teamState.team.length, ...newTeam);
        })
        .catch((err) => {
          toast.error(`Error fetching team from PokePaste: ${err}`);
        });
      return;
    }
    // check if it's a single set
    if (single) {
      if (teamState.team.length === 0) {
        toast.error('No Pokémon in team');
        return;
      }
      const newMon = Pokemon.importSet(text);
      if (!newMon) {
        toast.error('Invalid set paste');
        return;
      }
      teamState.team.splice(tabIdx, 1, newMon);
    } else {
      // it's a team paste
      const newTeam = Pokemon.convertPasteToTeam(text);
      if (!newTeam) {
        toast.error('Invalid team paste');
        return;
      }
      teamState.team.splice(0, teamState.team.length, ...newTeam);
    }
  };
  return (
    <>
      <input type="checkbox" id="import-ps-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold md:text-lg">Please leave your Showdown paste (or PokePaste link) here ↓</h3>
          <textarea className="textarea-secondary textarea w-full" rows={10} ref={importTextareaRef}></textarea>
          {tabIdx >= 0 && tabIdx < teamState.team.length && (
            <label className="label cursor-pointer">
              <span className="label-text">Only swap the current Pokémon set</span>
              <input type="checkbox" className="checkbox" checked={single} onChange={singleSetHandler} />
            </label>
          )}
          <div className="modal-action">
            <label htmlFor="import-ps-modal" className="btn-primary btn-sm btn" onClick={importHandler}>
              Import
            </label>
            <button className="btn-secondary btn-sm btn" onClick={loadExampleHandler}>
              Load Example
            </button>
            <label htmlFor="import-ps-modal" className="btn-sm btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
