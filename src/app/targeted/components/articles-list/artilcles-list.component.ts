import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Constants } from '../../../common/Constants';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleListService } from '../../services/artilce-list.service';
import { ArticleListModel } from '../../../targeted/models/article-list.model';
import { HeadlineSmallComponent } from '../../../common/components/headlines/headline-small.component';

@Component({
    selector: 'articles-list',
    templateUrl: 'articles-list.component.html',
})
export class ArticlesListComponent implements OnInit, AfterViewInit {
    @Input() isVisible: boolean = false;
    @Input() sids: string[] = [];
    private items: Array<ArticleListModel> = [];
    private _subscriber: Subscription;
    private _service: ArticleListService;
    private _url: string = '';
    private _keepGoing: boolean = true;

    constructor(public route: ActivatedRoute, http: Http, private _router: Router) {
        this._service = new ArticleListService(http);
        // this._router.events.forEach((event: NavigationEnd) => {
        //     // Do whatever in here

        //     if (event instanceof NavigationEnd ) {
        //         this.init();
        //         this._keepGoing = false;
        //     }
        // });
    }

    getItems() {
        this.sids.forEach((element, index) => {
            this._url += ('idsList=' + element + '&&');
        });
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article-list?' + this._url + '$orderby=DestArticleID')
            .subscribe(data => {
                this.items = data;
            });

    }

    ngOnInit() {
        //
        this.init();
    }

    ngAfterViewInit() {
        //
        this._keepGoing = true;
    }

    init() {
        //
        let data: string = this.route.snapshot.params['data']; // get list of id's as a string splited by ','
        if (typeof data !== 'undefined' && data) {
            this.sids = data.split(',');
        } else {
            this.sids = [];
        }
        this.getItems();
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }

}






