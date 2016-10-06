import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { SectionService } from '../services/section.service';
import { SectionModel } from '../models/section.model';

@Component({
    selector: 'section',
    templateUrl: 'section.component.html'
})
export class SectionComponent implements OnInit, OnDestroy {
    item: SectionModel;

    private _currentId: number;
    private _service: SectionService;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new SectionService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/section?article?%24filter=ArticleID%20eq%' + this._currentId)
            .subscribe(data => {
                this.item = data;
            });
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}
