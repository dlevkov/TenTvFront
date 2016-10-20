import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../../common/Constants';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleListService } from '../../services/artilce-list.service';
import { ArticleListModel } from '../../../targeted/models/article-list.model';
import { HeadlineSmallComponent } from '../../../common/components/headlines/headline-small.component';

@Component({
    selector: 'articles-list',
    templateUrl: 'articles-list.component.html',
})
export class ArticlesListComponent implements OnInit {
    private items: Array<ArticleListModel> = [];
    private _subscriber: Subscription;
    private _service: ArticleListService;
    private _serviceIds: string[] = [];
    private _url: string = '';

    constructor(public route: ActivatedRoute, http: Http, private _router: Router) {
        this._service = new ArticleListService(http);
    }

    getItems() {
        let index = 0;
        this._serviceIds.forEach((element, index) => {
            this._url += ('idsList=' + element + '&&');
        });
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$orderby=DestArticleID')
            .subscribe(data => {
                this.items = data;
            });

    }

    ngOnInit() {
        let data: string = this.route.snapshot.params['data']; // get list of id's as a string splited by ','
        this._serviceIds = data.split(',');
        this.getItems();

    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}






