export enum FocusedField {
  Species = 'Species',
  Item = 'Item',
  Ability = 'Ability',
  Moves = 'Moves',
  Stats = 'Stats',
}

// FocusedFieldToIdx maps a selected panel to the index of the specific field
// (if the selected panel is not Moves, then the index is 0, which is meaningless atm)
export type FocusedFieldToIdx = { [key in FocusedField]?: number };
export type FocusedFieldAction = { type: 'set'; payload: FocusedFieldToIdx } | { type: 'next'; payload: FocusedFieldToIdx };

export function compareFocusedFieldToIdx(a: FocusedFieldToIdx, b: FocusedFieldToIdx) {
  return Object.entries(a).toString() === Object.entries(b).toString();
}
