import { Component, OnDestroy, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../../common/Constants';
import { Subscription } from 'rxjs/Rx';
import { ArticleListService } from '../../services/artilce-list.service';
import { ArticleListModel } from '../../../targeted/models/article-list.model';
import { HeadlineSmallComponent } from '../../../common/components/headlines/headline-small.component';

@Component({
    selector: 'articles-list',
    templateUrl: 'articles-list.component.html',
})
export class ArticlesListComponent {
    @Input() isVisible: boolean = false;
    @Input() sids: string[] = [];
    private items: Array<ArticleListModel> = [];
    private _subscriber: Subscription;
    private _service: ArticleListService;
    private _url: string = '';
    private _keepGoing: boolean = true;
    private _routeSubscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new ArticleListService(http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            this.init(x['data']);
        });
    }

    init(data: string) {
        //
        if (typeof data !== 'undefined' && data) {
            this.sids = data.split(',');
        } else {
            this.sids = [];
        }
        this._url = '';
        this.sids.forEach((element, index) => {
            this._url += ('idsList=' + element + '&&');
        });
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$orderby=DestArticleID')
            .subscribe(d => {
                this.items = d;
            });
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

}






