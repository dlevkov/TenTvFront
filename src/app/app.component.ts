/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
<<<<<<< HEAD

      <router-outlet></router-outlet>

=======
          <router-outlet></router-outlet>
>>>>>>> 5d4a8f3a5d166011d729d0868f0550afff8f1179
  `
})
export class App {


  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
