export enum Note {
  A_FLAT = 'A♭',
  A = 'A',
  B_FLAT = 'B♭',
  B = 'B',
  C = 'C',
  D_FLAT = 'D♭',
  D = 'D',
  E_FLAT = 'E♭',
  E = 'E',
  F = 'F',
  G_FLAT = 'G♭',
  G = 'G',
}

export interface StringObject {
  id: Note
}

export type StringMap = Map<number, StringObject>

export interface Neck {
  strings: StringMap
}

export type Necks = Map<number, Neck>
