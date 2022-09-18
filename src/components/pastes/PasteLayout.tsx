import { Icons, Sprites } from '@pkmn/img';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { PureSpriteAvatar } from '@/components/workspace/SpriteAvatar/SpriteAvatar';
import { Pokemon } from '@/models/Pokemon';
import { PokePaste } from '@/models/PokePaste';
import { convertStylesStringToObject, S4 } from '@/utils/Helpers';

const PasteLayout = ({ paste }: { paste: PokePaste }) => {
  const team = Pokemon.convertPasteToTeam(paste.paste) || [];
  return (
    <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-3">
      {/* avatars */}
      <div className="hidden grid-rows-6 md:grid">
        {team.map((p) => (
          <PureSpriteAvatar key={p.species} url={Sprites.getPokemon(p.species).url} />
        ))}
      </div>
      <div className="grid grid-cols-3 grid-rows-2 justify-items-center align-middle md:hidden">
        {team.map((p) => (
          <span key={p.species} style={convertStylesStringToObject(Icons.getPokemon(p.species).style)}></span>
        ))}
      </div>
      {/* paste */}
      <pre className="w-4/5 whitespace-pre-wrap">{paste.paste}</pre>
      {/* metadata */}
      <div className="prose w-4/5 py-6">
        <h1>{paste.title}</h1>
        <h3>Author: {paste.author}</h3>
        <p className="break-all">Notes: {paste.notes}</p>
        <div className="flex justify-around">
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(paste.paste).then(() => toast('📋 Copied!'));
            }}
          >
            Copy PokePaste
          </button>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <Link href={`/room/room_${S4()}${S4()}/?protocol=WebSocket&packed=${paste.toPackedTeam()}`}>
            <a className="btn btn-secondary btn-sm">Open in Room</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PasteLayout;