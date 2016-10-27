import { Component, Input, OnDestroy, NgZone } from '@angular/core';
import { PubSubService } from '../../Global/PubSubService';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'controller',
    template: ''
})
export class Controller implements OnDestroy {
    private _routeSubscriber: Subscription;
    
    constructor(/*private pubSubService: PubSubService,**/ private _router: Router, private _ngZone: NgZone) {
window.angularComponentRef = { component: this, zone: _ngZone };
        this._router.events.forEach((x) => {
            // Do whatever in here
            if (x instanceof NavigationEnd ) {
                 console.log(x);
            }
        });
    }
    createCustomer() {

        //this.pubSubService.Stream.emit(customer);
    }

    getRouteUrl(data: String) {
        this._ngZone.run(() => {
            this.setVisible();
        });
    }

    private setVisible() {
        this._isVisible = true;
        window.scrollTo(0, 0);
    }

    ngOnDestroy() {
        //console.log('Controller dtor');
    }
}