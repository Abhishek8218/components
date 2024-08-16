// state/modalState.ts
import { atom } from 'recoil';

export const modalStackState = atom<string[]>({
  key: 'modalStackState',
  default: [],
});
