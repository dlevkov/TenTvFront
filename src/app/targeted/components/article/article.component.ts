import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
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
export class ArticleComponent implements OnInit, OnDestroy, AfterViewInit {
    item: ArticleModel;
    private _currentId: number;
    private _service: ArticleService;
    private _subscriber: Subscription;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;

    constructor(public route: ActivatedRoute, http: Http, private myElement: ElementRef) {
        this._service = new ArticleService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    ngAfterViewInit() {
        // console.log(window['test123']);
        // window['testtext']('xxxxxxxxxxxxxx');

        // let newNode =   document.createElement('div');
        // newNode.id = 'anton';
        //let textNode = document.createTextNode('<div><span class="gljfhg">Hi there and greetings!<span><div>');
        // newNode.innerHTML = '<div><span class="gljfhg">Hi there and greetings!<span><div>';
        // window['insertAfter'](newNode, this.myElement.nativeElement);
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
