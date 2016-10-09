import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section.component';
import { MainComponent } from './targeted/components/main.component';
import { DataResolver } from './app.resolver';
import { ArticleComponent } from './targeted/components/article/article.component';



export const ROUTES: Routes = [
  { path: '', component: NoContent },
  { path: 'section/:id', component: SectionComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'main', component: MainComponent },
  { path: '**', component: NoContent },

];
