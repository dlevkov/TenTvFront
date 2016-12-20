import { Component, OnInit, OnDestroy, AfterViewChecked, trigger, state, style, transition, animate, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { TwitterService } from '../../services/twitter.service';
import { TwitterModel } from '../../models/twitter.model';
import { Constants } from '../../Constants';

@Component({
    selector: 'twitter-toolbar',
    templateUrl: 'twitter-toolbar.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    },
    animations: [
        trigger('openClose', [
            state('collapsed, void',
                style({ top: '-60px', color: 'white' })),
            state('expanded',
                style({ top: '0', color: 'black' })),
            transition('collapsed <=> expanded', [
                animate(500)
            ])
        ])
    ]
})
export class TwitterToolbarComponent implements OnInit, OnDestroy {
    items: TwitterModel[];
    animationState: string = 'collapsed';
    private _currentItem: TwitterModel;
    private _currentId: number;
    private _service: TwitterService;
    private _subscriber: Subscription;
    private _isVisible: boolean = true;
    private _isPolled = false;
    private _itemId: number = 0;

    constructor(http: Http, private myElement: ElementRef) {
        this._service = new TwitterService(http);
    }

    scrolleEvent(event) {
        this._isVisible = (0 <= window.pageYOffset && window.pageYOffset < Constants.SCROLL_POSITION) ? true : false;
    }


    ngOnInit() {
        this._subscriber = this._service
            .getTwitts()
            .subscribe(data => {
                this.items = data;
                if (!this._currentItem || this._currentItem.CounterId === 0) // is first time or last DB value
                    this._currentItem = data[0];
                this.resubscribe();
            });
        this.animationState = 'expanded';
        this.initInterval();
    }

    resubscribe() {
        if (this.items != null && !this._isPolled) {
            console.log('checked change');
            this._subscriber.unsubscribe();
            this._subscriber = this._service
                .pollITwitts()
                .subscribe(data => {
                    this.items = data;
                    if (!this._currentItem || this._currentItem.CounterId === 0) // is first time or last DB value
                        this._currentItem = data[0];
                });
            this._isPolled = true;
        }
    }

    //ngAfterViewChecked() {
        // if (this.items != null && !this._isPolled) {
        //     console.log('checked change');
        //     this._subscriber.unsubscribe();
        //     this._subscriber = this._service
        //         .pollITwitts()
        //         .subscribe(data => {
        //             this.items = data;
        //             if (!this._currentItem || this._currentItem.CounterId === 0) // is first time or last DB value
        //                 this._currentItem = data[0];
        //         });
        //     this._isPolled = true;
        // }
    //}

    getNext() {
        if (typeof this.items !== 'undefined') {
            if (this.items.length <= this._itemId + 1) {
                this._currentItem = this.items[0];
            } else {
                this._itemId++;
            }
            this.animateTransition();

            this._currentItem = this.items[this._itemId];
        }
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
    private animateTransition() {
        let nanaHelper = window['nanaHelper'];
        nanaHelper.animateslideUp('#twiiterItemUn');

        // this.animateNonSafari();
        // let casttimePlayer = new window['casttimePlayer']();

        // casttimePlayer.platform = casttimePlayer.getMobileOperatingSystem();
        // if (casttimePlayer.platform === "android") {
        //     //animate non safari
        //     this.animateNonSafari();
        // } else if (casttimePlayer.platform === "ios") {
        //     //animate safari
        //     this.animateNonSafari();
        // } else {
        //     this.animateNonSafari();
        // }

    }

    // private isIphone5() {
    //     function iOSVersion() {
    //         let agent = window.navigator.userAgent,
    //             start = agent.indexOf('OS ');
    //         if ((agent.indexOf('iPhone') > -1) && start > -1)
    //             return window.Number(agent.substr(start + 3, 3).replace('_', '.'));  else return 0;
    //     }
    //     return iOSVersion() >= 6 && window.devicePixelRatio >= 2 && screen.availHeight === 548 ? true : false;
    // }

    private animateNonSafari() {
        if (this.animationState === 'collapsed') {
            this.animationState = 'expanded';
        } else {
            this.animationState = 'collapsed';
            window.setTimeout(() => {
                this.affectChange();
            }, 500);

        }
    }

    private animateSafari() {
        //
    }

    private affectChange() {
        this.animationState = 'expanded';
    }

    private initInterval() {
        window.setInterval(() => {
            this.getNext();
        }, Constants.TWITTERTICKERINTERVAL);
    }

}
