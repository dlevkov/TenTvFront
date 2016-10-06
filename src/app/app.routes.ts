import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section.component';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: NoContent },
  { path: '**', component: NoContent },
  { path: 'section:id', component: SectionComponent }
];
