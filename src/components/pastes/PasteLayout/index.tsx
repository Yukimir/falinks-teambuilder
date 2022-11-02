import type { TypeEffectiveness } from '@pkmn/data';
import { Sprites } from '@pkmn/img';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useId, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWRImmutable from 'swr/immutable';

import { PokemonIcon } from '@/components/icons/PokemonIcon';
import { TeamTypeChart } from '@/components/table/TeamTypeChart';
import { PureSpriteAvatar } from '@/components/workspace/SpriteAvatar/SpriteAvatar';
import { Pokemon } from '@/models/Pokemon';
import Loading from '@/templates/Loading';
import { Paste } from '@/utils/Prisma';

const PasteAndFunctions = ({ team, paste }: { team: Pokemon[]; paste: NonNullable<Paste> }) => {
  const roomId = useId();
  const { locale } = useRouter();

  // handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.paste).then(() => toast('📋 Copied!'));
  };

  const handleShare = () => {
    // try Web Share API first, fallback to copy link to clipboard
    try {
      navigator.share({
        text: paste.paste,
        url: window.location.href,
        title: paste.title,
      });
    } catch (e) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast('📋 The link has been copied to your clipboard as your browser does not support Web Share API.'));
    }
  };

  return (
    <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-3">
      {/* avatars */}
      <div className="hidden grid-rows-6 md:grid">
        {team.map((p) => (
          <PureSpriteAvatar key={p.species} url={Sprites.getPokemon(p.species).url} />
        ))}
      </div>
      <div className="grid w-1/2 grid-cols-3 justify-items-center align-middle md:hidden">
        {team.map(({ species }) => (
          <PokemonIcon speciesId={species} key={species} />
        ))}
      </div>
      {/* paste */}
      <pre className="ml-5 w-4/5 whitespace-pre-wrap">{paste.paste}</pre>
      {/* metadata */}
      <div className="prose ml-5 w-4/5 py-6">
        <h1>{paste.title}</h1>
        <h3>Author: {paste.author}</h3>
        <ul>
          <li>Format: {paste.format}</li>
          <li>
            Created at:{' '}
            {new Intl.DateTimeFormat(locale ?? 'en-US', {
              dateStyle: 'long',
            }).format(new Date(paste.createdAt))}
          </li>
          <li className="break-all">Source: {paste.source || 'None'}</li>
          <li>Rental Code: {paste.rentalCode || 'None'}</li>
        </ul>
        <p className="break-all">Notes: {paste.notes}</p>
        <div className="flex justify-around">
          <button className="btn-primary btn-sm btn" type="button" onClick={handleCopy}>
            Copy PokePaste
          </button>
          <button className="btn-secondary btn-sm btn" type="button" onClick={handleShare}>
            Share
          </button>
          <Link href={`/room/room_${roomId}/?protocol=WebSocket&packed=${Pokemon.convertPasteToPackedTeam(paste.paste)}`}>
            <a className="btn-accent btn-sm btn">Open in Room</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TeamInsight = ({ team }: { team: Pokemon[] }) => {
  const { defenseMap, offenseMap } = Pokemon.getTeamTypeChart(team);
  return (
    <div className="flex flex-col gap-2 overflow-x-auto p-2">
      <h1 className="text-2xl font-bold">Team Insight</h1>
      <h2 className="text-xl font-bold">Defense</h2>
      <TeamTypeChart teamTypeChart={defenseMap} direction={'defense'} />
      <h2 className="text-xl font-bold">Offense</h2>
      <TeamTypeChart<TypeEffectiveness> teamTypeChart={offenseMap} direction={'offense'} />
    </div>
  );
};

type Tabs = 'Team' | 'insight';

const PasteLayout = ({ id }: { id: string }) => {
  const [tab, setTab] = useState<Tabs>('Team');
  const { data: paste, error } = useSWRImmutable<Paste>(id, (i) => fetch(`/api/pastes/${i}`).then((res) => res.json()));

  if (error) {
    toast.error('An error occurred while fetching the paste.');
    return null;
  }
  if (!paste) return <Loading />;
  const team = Pokemon.convertPasteToTeam(paste.paste) || [];

  return (
    <>
      <div className="tabs tabs-boxed">
        {['Team', 'Insight'].map((t) => (
          <a key={t} className={`tab ${tab === t ? 'tab-active' : ''}`} onClick={() => setTab(t as Tabs)}>
            {t}
          </a>
        ))}
      </div>
      {tab === 'Team' ? <PasteAndFunctions team={team} paste={paste} /> : <TeamInsight team={team} />}
    </>
  );
};

export default PasteLayout;
