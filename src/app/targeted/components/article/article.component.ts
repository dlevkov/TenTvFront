import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article.model';

@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
    item: ArticleModel;
    private _currentId: number;
    private _service: ArticleService;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new ArticleService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];

        this.getItems();
        // console.log("IconURL2: " + this.item.IconURL2);
    }
    getItems() {
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article?$filter=ArticleID eq ' + this._currentId).subscribe(data =>
            this.item = data);
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}
