import { Component, OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { TwitterService } from '../../services/twitter.service';
import { TwitterModel } from '../../models/twitter.model';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'twitter',
    templateUrl: 'twitter.component.html'
})
export class TwitterComponent implements OnInit, OnDestroy, AfterViewChecked {
    items: TwitterModel[];
    private _item: TwitterModel;
    private _currentId: number;
    private _service: TwitterService;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http, private _sanitizer: DomSanitizer) {
        this._service = new TwitterService(http);
    }

    ngOnInit() {
        // this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/Twitts')
            .subscribe(data => {
                this.items = data;
                this._item = data[0];
            });
    }
    getNext(id: number) {
        console.log('next ' + id);

        this._item = this.items[id++];
    }
    ngAfterViewChecked() {
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}
