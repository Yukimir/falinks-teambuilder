import { TypeEffectiveness, TypeName } from '@pkmn/data';
import { StatsTable } from '@pkmn/types';
import { MovesetStatistics } from 'smogon';

export type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;
export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type Modify<T, R> = Omit<T, keyof R> & R;

export type Option = {
  label: string;
  value: string;
};

export type SelectProps<T extends Option | Option[]> = {
  options: Option[];
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
  itemClassName?: string;
  defaultValue?: T;
  value?: T;
  onChange?: (selected: T) => void;
  placeholder?: string;
  iconGetter?: (key: string) => JSX.Element;
  ariaLabel?: string;
};

export type Usage = Modify<
  MovesetStatistics,
  {
    Abilities: Partial<MovesetStatistics['Abilities']>;
    Items: Partial<MovesetStatistics['Items']>;
    Moves: Partial<MovesetStatistics['Moves']>;
    Spreads: Partial<MovesetStatistics['Spreads']>;
    Teammates: Partial<MovesetStatistics['Teammates']>;
  }
> & { name: string; rank: number };

export type SearchPastePokemonCriteria = {
  species: string;
  ability?: string;
  item?: string;
  moves: string[];
  minEVs: StatsTable;
  maxEVs: StatsTable;
};

export type SearchPasteForm = {
  speciesCriterion: SearchPastePokemonCriteria[];
  format: string;
  hasRentalCode: boolean;
};

export type Spreads = {
  label: string;
  nature: string;
  evs: StatsTable;
};

export type ValueWithEmojiOption<T extends string = string> = {
  value: T;
  emoji: string;
};

export type BasePokePaste = {
  paste: string;
  format: string;
  title?: string;
  author?: string;
  notes?: string;
};

export type ExtendedTypeEffectiveness = TypeEffectiveness | 0.25 | 4;

// key: TypeName, value: damage multiplier to species ID
export type Type2EffectivenessMap<T extends ExtendedTypeEffectiveness | TypeEffectiveness = ExtendedTypeEffectiveness> = Map<TypeName, Record<T, string[]>>;

export type IndexedDBTeam = {
  species: string[];
  format: string;
};
