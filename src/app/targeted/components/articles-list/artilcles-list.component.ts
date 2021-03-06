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
    // host: {
    //     '(window:scroll)': 'scrolleEvent($event)'
    // }
})
export class ArticlesListComponent {
    @Input() isVisible: boolean = false;
    @Input() sids: number[] = [];
    @Input() isInArticle: boolean = false;
    seed: string;
    private items: Array<ArticleListModel> = [];
    private _subscriber: Subscription;
    private _service: ArticleListService;
    private _url: string = '';
    private _keepGoing: boolean = true;
    private _routeSubscriber: Subscription;
    private _currentPage: number = 1;
    private _itemsPerPage: number = 10;


    constructor(private http: Http, private _router: Router, private _ngZone: NgZone, public route: ActivatedRoute) {
        this._service = new ArticleListService(this.http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            this.init(x['data']);
        });
    }

    init(data: string) {
        //
        this.seed = new Date().getMilliseconds().toString();
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
            this._url += ('idsList=' + element + '&');
        });
        ///TenTvAppFront/article-list?idsList=126&%24top=10&%24orderby=DestArticleID%20desc
        // this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$top=' + (this._currentPage++ * this._itemsPerPage) + '&$orderby=DestArticleID desc')
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$top=' + 100 + '&$orderby=DestArticleID desc')
            .subscribe(d => {
                this.items = d;
                if (!this.isInArticle) {
                    setTimeout(() => {
                        if (this.route.snapshot) {
                            this.scrollIntoView('articleList');
                        }
                    }, 1000);
                }

            });
    }

//  scrolleEvent(event) {
// if($(window).scrollTop() + $(window).height() == $(document).height()) {
//        alert("bottom!");
//    }
//  }
    loadMore() {
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$top=' + (this._currentPage++ * this._itemsPerPage) + '&$orderby=DestArticleID desc')
            .subscribe(d => {
                this.items = d;
            });
    }

    generateDfpId(id: number): any {
        let newid = id / 5;
        return Math.floor(newid + 3);
    }

    ngOnChanges() {
        this.seed = new Date().getMilliseconds().toPrecision();
    }

    isDfp(id: number): boolean {
        // TODO: it's a magic, magic...
        return id <= (5 * 3) && (id + 1) % 5 === 0;
    }


    toggleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }

    scrollIntoView(eleID) {
        if (typeof this.route.snapshot.url !== 'undefined' && this.route.snapshot.url.length > 0 && this.route.snapshot.url['0'].path !== 'main') {
            let e = document.getElementById(eleID);
            if (!!e && e.scrollIntoView) {
                e.scrollIntoView();
            }
        }
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

}






