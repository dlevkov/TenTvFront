import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import {InstagramComponent } from './common/components/instagram/instagram.component';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section/section.component';

import { HeadlineBigComponent } from './common/components/headlines/headline-big.component';
import { HeadlineSmallComponent } from './common/components/headlines/headline-small.component';
import { HeadlineMainComponent } from './common/components/headlines/headline-main.component';
import { HeadlineAlertComponent } from './common/components/headlines/headline-alert.component';
import { HeadlinePairComponent } from './common/components/headlines/headline-pair.component';

import { ArticleComponent } from './targeted/components/article/article.component';
import { ParagraphComponent } from './targeted/components/paragraph/paragraph.component';
import { MainComponent } from './targeted/components/main.component';
import { TwitterComponent } from './common/components/twitter/twitter.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    NoContent,
    ArticleComponent,
    SectionComponent,
    MainComponent,
    HeadlineSmallComponent,
    HeadlineBigComponent,
    ParagraphComponent,
    HeadlineMainComponent,
    HeadlineAlertComponent,
    HeadlinePairComponent,
    InstagramComponent

  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

