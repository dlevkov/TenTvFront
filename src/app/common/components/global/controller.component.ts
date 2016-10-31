import { Component, Input, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import { PubSubService } from '../../Global/PubSubService';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';

@Component({
    selector: 'controller',
    template: ''
})
export class Controller implements OnDestroy, AfterViewInit {
    private _routeSubscriber: Subscription;
    private _isVisible: boolean = true;
    private _nanaRouteRef: any;

    constructor(/*private pubSubService: PubSubService,**/ private _router: Router, private _ngZone: NgZone) {
        window.angularComponentRef = { component: this, zone: _ngZone };
        this._nanaRouteRef = window['nanaRoute'];
        this._router.events.forEach((x) => {
            // Do whatever in here
            if (x instanceof NavigationEnd) {
                this._nanaRouteRef.invokeRouteEvent(x.url);
                this.handleStatickTopFour(x.url);
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

    ngOnDestroy() {
        //console.log('Controller dtor');
    }

    ngAfterViewInit() {
        console.log('Controller AfterViewChecked');
    }

    private handleStatickTopFour(path: string) {
        if (path === '/' || path === '/main') {
            //window['TopFour'].hide();
        } else {
            window['TopFour'].hide();
        }
    }
    private setVisible() {
        this._isVisible = true;
        window.scrollTo(0, 0);
    }
}