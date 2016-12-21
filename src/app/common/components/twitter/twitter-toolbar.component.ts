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

    constructor(http: Http, private _element: ElementRef) {
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
                this.initInterval();
            });
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
        let twitter = this._element.nativeElement.children[0];
        $nana('#twiiterItemUn').hide('slide', {
            direction: 'down'
        }, 400);
        window.setTimeout(function () {
            $nana('#twiiterItemUn').show('slide', {
                direction: 'up'
            }, 700);
        }, 450);
    }

    private initInterval() {
        window.setInterval(() => {
            this.getNext();
        }, Constants.TWITTERTICKERINTERVAL);
    }

}
