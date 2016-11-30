import { Component, OnDestroy, Input, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from '../../../common/Constants';
import { Cookies } from '../../../common/Cookies';
import { Subscription } from 'rxjs/Rx';
import { ArticleListService } from '../../services/artilce-list.service';
import { ArticleListModel } from '../../../targeted/models/article-list.model';
import { HeadlineSmallComponent } from '../../../common/components/headlines/headline-small.component';
import { FilterServiceComponent } from '../filter-service/filter-service.component';

@Component({
    selector: 'articles-list',
    templateUrl: 'articles-list.component.html',
})
export class ArticlesListComponent {
    @Input() isVisible: boolean = false;
    @Input() sids: number[] = [];
    @Input() isInArticle: boolean = false;
    private items: Array<ArticleListModel> = [];
    private _subscriber: Subscription;
    private _service: ArticleListService;
    private _url: string = '';
    private _keepGoing: boolean = true;
    private _routeSubscriber: Subscription;

    constructor(private http: Http, private _router: Router, private _ngZone: NgZone, public route: ActivatedRoute) {
        this._service = new ArticleListService(this.http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            this.init(x['data']);
        });
    }

    init(data: string) {
        //

        if (typeof data !== 'undefined' && data) {
            data.split(',').forEach(element => {
                this.sids.push(+element);
            });

        } else if (Cookies.nanaFilterSids.length > 0) {
            //
            this.sids = Cookies.nanaFilterSids;

        } else {
            this.sids = [];
        }
        this._url = '';
        this.sids.forEach((element, index) => {
            this._url += ('idsList=' + element + '&&');
        });
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$orderby=DestArticleID desc')
            .subscribe(d => {
                this.items = d;
                if (!this.isInArticle) {
                    window.setTimeout(() => {
                        this.scrollIntoView('articleList');
                    }, 1000);
                }

            });
    }

    toggleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }

    scrollIntoView(eleID) {
        let e = document.getElementById(eleID);
        if (!!e && e.scrollIntoView) {
            e.scrollIntoView();
        }
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

}






