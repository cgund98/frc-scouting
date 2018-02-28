import { MongoObservable } from 'meteor-rxjs';

import { Match } from '../models/match.model';

export const Matches = new MongoObservable.Collection<Match>('matches');