import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../../common/Constants';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleListService } from '../../services/artilce-list.service';
import { HeadlineModel } from '../../../common/models/headline.model';


@Component({
    selector: 'articles-list',
    templateUrl: 'articles-list.component.html',
})
export class ArticlesListComponent implements OnInit {
    private item: HeadlineModel;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private _subscriber: Subscription;
    private _service: ArticleListService;
    private _serviceIds: number[] = [];
    private _url: string;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new ArticleListService(http);
    }

    getItems() {
        this._serviceIds.forEach((element, index) => {
            this._url = 'idsList=' + element;
            if (this._serviceIds.length !== index) {
                this._url += '&&';
            }
        });
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url)
            .subscribe(data => {
                this.item = data;
                console.log(data);
                // this._loadingUrl = this.item.TitlePic;
            });
    }

    ngOnInit() {
        this._serviceIds = this.route.snapshot.params['ids'];
        this.getItems();
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

}






