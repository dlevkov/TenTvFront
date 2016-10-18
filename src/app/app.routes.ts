import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section/section.component';
import { MainComponent } from './targeted/components/main/main.component';
import { DataResolver } from './app.resolver';
import { ArticleComponent } from './targeted/components/article/article.component';
import { TwitterComponent } from './common/components/twitter/twitter.component';


export const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'section/:id', component: SectionComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: '**', component: NoContent },

];
