import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article.model';
import { Constants } from '../../../common/Constants';

@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
    item: ArticleModel;
    private _currentId: number;
    private _service: ArticleService;
    private _subscriber: Subscription;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new ArticleService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article?$filter=ArticleID eq ' + this._currentId)
            .subscribe(data => {
                this.item = data;
                this._loadingUrl = this.item.TitlePic;
            });
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();

    }
}
