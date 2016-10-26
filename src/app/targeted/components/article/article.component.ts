import { Component, OnDestroy, ElementRef, NgZone } from '@angular/core';
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
export class ArticleComponent implements OnDestroy {
    item: ArticleModel;
    parser: any = window['contentParser'];
    private _currentId: number;
    private _service: ArticleService;
    private _subscriber: Subscription;
    private _routeSubscriber: Subscription;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;

    constructor(public route: ActivatedRoute, http: Http, private myElement: ElementRef, private _ngZone: NgZone) {
        window.angularComponentRef = { component: this, zone: _ngZone };
        this._service = new ArticleService(http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            this._currentId = +x['id'];
            this.getItems();
            window.scrollTo(0, 0); // fix scroll in case of article to article navigation
        });

    }

    getItems() {
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article/' + this._currentId)
            .subscribe(data => {
                this.item = data;
                this.parser.length = this.item.Paragraphs.length;
                console.log(this.item.Paragraphs);
                this._loadingUrl = this.item.TitlePic;
            });

    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
        this._routeSubscriber.unsubscribe();
    }

    // ***************************************************************************************************************************//
    // Get angular function from external JS:
    // Add to \src\custom-typings.d.ts -  interface Window { angularComponentRef : any; }

    // constructor(private _ngZone: NgZone) {
    //     window.angularComponentRef = { component: this, zone: _ngZone };    //     
    // }

    // publicFunc(data: String) {
    //     this._ngZone.run(() => {
    //         this.privateFunc(data);
    //     });
    // }
    // privateFunc(str) {
    //     console.log("print: " + str);

    // }

    // Use in your outside JS 
    // window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.publicFunc('bla bla');})
    // ***************************************************************************************************************************//
}
