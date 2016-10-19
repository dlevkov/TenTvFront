import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { TwitterService } from '../../services/twitter.service';
import { TwitterModel } from '../../models/twitter.model';
import { Constants } from '../../Constants';

@Component({
    selector: 'twitter',
    templateUrl: 'twitter-toolbar.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})
export class TwitterToolbarComponent implements OnInit, OnDestroy {
    items: TwitterModel[];
    private _currentItem: TwitterModel;
    private _currentId: number;
    private _service: TwitterService;
    private _subscriber: Subscription;
    private _isVisible: boolean = true;

    constructor(http: Http) {
        this._service = new TwitterService(http);
    }

    scrolleEvent(event) {
        this._isVisible = (0 <= window.pageYOffset && window.pageYOffset < Constants.SCROLL_POSITION) ? true : false;
    }


    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service
            .pollITwitts()
            .subscribe(data => {
                this.items = data;
                if (!this._currentItem || this._currentItem.CounterId === 0) // is first time or last DB value
                    this._currentItem = data[0];
            });
    }
    getNext(id: number) {
        id++;
        if (this.items.length >= id)
            this._currentItem = this.items[0];
        this._currentItem = this.items[id];
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}
