import { Route } from '@angular/router';

import { CollectPageComponent } from '../pages/collect/collect-page.component';
import { AnalyzePageComponent } from '../pages/analyze/analyze-page.component';

export const routes: Route[] = [
	{ path: 'collect', component: CollectPageComponent },
  { path: 'analyze', component: AnalyzePageComponent },
];