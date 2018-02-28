import { CollectionObject } from './collection-object.model';

export interface Match extends CollectionObject {
  matchNum: number;
  teamNum: number;
  totalPickedUp: number;
  totalPlaced: number;
  climbed: boolean;
  runs: any;
}