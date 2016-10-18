import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, NgZone } from '@angular/core';
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

    constructor(public route: ActivatedRoute, http: Http, private myElement: ElementRef, private _ngZone: NgZone) {
        window.angularComponentRef = { component: this, zone: _ngZone };
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

    //***************************************************************************************************************************//
    //Get angular function from external JS:
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

    //Use in your outside JS 
    // window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.publicFunc('bla bla');})
    //***************************************************************************************************************************//
}
