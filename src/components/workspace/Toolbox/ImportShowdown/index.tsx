import { UploadIcon } from '@heroicons/react/solid';
import { useContext, useRef } from 'react';
import { toast } from 'react-hot-toast';

import { StoreContext } from '@/components/workspace/Contexts/StoreContext';
import { Pokemon } from '@/models/Pokemon';

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
  const { teamState } = useContext(StoreContext);

  const importTextareaRef = useRef<HTMLTextAreaElement>(null);

  const loadExampleHandler = () => {
    if (importTextareaRef.current) {
      importTextareaRef.current.value = exampleText;
    }
  };

  const importHandler = () => {
    const newTeam = Pokemon.convertPasteToTeam(importTextareaRef.current?.value ?? '');
    if (newTeam) {
      teamState.team.splice(0, teamState.team.length, ...newTeam);
    } else {
      toast.error('Invalid paste');
    }
    // clear the textarea
    if (importTextareaRef.current) {
      importTextareaRef.current.value = '';
    }
  };
  return (
    <>
      <input type="checkbox" id="import-ps-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold md:text-lg">Please leave your Showdown paste here ↓</h3>
          <textarea className="textarea-secondary textarea w-full" ref={importTextareaRef}></textarea>
          <div className="modal-action">
            <button className="btn btn-secondary btn-sm" onClick={loadExampleHandler}>
              Load Example
            </button>
            <label htmlFor="import-ps-modal" className="btn btn-primary btn-sm" onClick={importHandler}>
              Import
            </label>
            <label htmlFor="import-ps-modal" className="btn btn-sm">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

function ImportShowdown() {
  return (
    <label htmlFor="import-ps-modal" className="modal-button rounded" title="Import a team from Showdown paste">
      <UploadIcon className="h-4 w-4 md:h-6 md:w-6" />
      <span>Import</span>
    </label>
  );
}

export default ImportShowdown;