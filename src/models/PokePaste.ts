import { Team } from '@pkmn/sets';

import { Pokemon } from '@/models/Pokemon';
import { urlPattern } from '@/utils/Helpers';

export class PokePaste {
  author: string;

  notes: string;

  paste: string;

  title: string;

  constructor({ author, notes, paste, title }: { author: string; notes: string; paste: string; title: string }) {
    this.author = author;
    this.notes = notes;
    this.paste = paste;
    this.title = title;
  }

  extractPokemonFromPaste(): Pokemon[] | undefined {
    return Pokemon.convertPasteToTeam(this.paste);
  }

  static fromPackedTeam(packedTeam: string): PokePaste | undefined {
    const unpacked = Team.unpack(packedTeam);
    if (!unpacked) return undefined;
    return new PokePaste({
      author: '',
      notes: '',
      paste: unpacked.export(),
      title: unpacked.name || '',
    });
  }

  static isValidPokePasteURL = (str: string) => urlPattern.test(str) && str.includes('pokepast.es');

  static pokePasteURLFetcher = (url: string) =>
    fetch(`${url}/json`)
      .then((res) => res.json())
      .then((data) => {
        return new PokePaste(data);
      });
}
