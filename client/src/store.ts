import { atom } from 'jotai'

export type HistoryItemType = {
  placeName: string,
  postCode: string,
  state: string,
  keyProp: string
}

export const countryAtom = atom<string>('US')
export const postCodeAtom = atom<string>('') 
export const historyAtom = atom<HistoryItemType[]>([])