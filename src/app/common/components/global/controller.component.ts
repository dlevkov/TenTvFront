import { Component, Input, NgZone } from '@angular/core';
import { PubSubService } from '../../Global/PubSubService';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { Location } from '@angular/common';

@Component({
    selector: 'controller',
    template: ''
})
export class Controller {
    private _routeSubscriber: Subscription;
    private _isVisible: boolean = true;
    private _nanaRouteRef: any;

    constructor(/*private pubSubService: PubSubService,**/ private _router: Router, private _ngZone: NgZone, private _location: Location) {
        window.angularComponentRef = { component: this, zone: _ngZone };
        window.angularComponentNav = { component: this, zone: _ngZone };

        this._nanaRouteRef = window['nanaRoute'];
        this._router.events.forEach((x) => {
            // Do whatever in here
            if (x instanceof NavigationStart) {
                this._nanaRouteRef.invokeRouteEvent(x.url, this.isArticle(x.url), this.isSection(x.url), this.isTwitter(x.url), null);
                this.handleStatickTopFour(x.url);
            }
        });
        this._router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe(evt => {
                if (!evt.url.includes('/mainfiltered/'))
                    console.log('maavaron on:' + evt.url);
            });
        // this._router.events.forEach((x) => {
        //     // Do whatever in here
        //     if (x instanceof NavigationEnd) {
        //         this._nanaRouteRef.invokeRouteEvent(x.url);
        //         this.handleStatickTopFour(x.url);
        //     }
        // });
    }

    getRouteUrl(data: String) {
        this._ngZone.run(() => {
            this.setVisible();
        });
    }

    navigateBack(data: string) {
        this._ngZone.run(() => {
            window.scrollTo(0, 0);
            this._location.back(); // in HTML5 window.history.back(); works fine
        });
    }
    private handleStatickTopFour(path: string) {
        if (path === '/' || path === '/main') {
            // window['TopFour'].hide();
        } else {
            window['TopFour'].hide();
        }
    }

    private isArticle(url: string) {
        return false; // Article part handeled in Article.component
    }

    private isTwitter(url: string) {
        return url.search('twitter') >= 0;
    }

    private isSection(url: string) {
        return url.search('section') >= 0;
    }


    private setVisible() {
        this._isVisible = true;
        window.scrollTo(0, 0);
    }

    private navigateForward() {
        this._location.forward();
    }
}
