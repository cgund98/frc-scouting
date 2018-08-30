import { MongoObservable } from 'meteor-rxjs';

import { Competition } from '../models/competition.model';

export const Competitions = new MongoObservable.Collection<Competition>('competitions');
