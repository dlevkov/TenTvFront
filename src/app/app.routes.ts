import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './common/components/no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: NoContent },
  { path: '**',    component: NoContent },
];
