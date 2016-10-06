import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleService } from '../services/article.service';

@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnInit {
    items: any[];
    private _currentId: number;
    private _service: ArticleService;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new ArticleService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
    }
    getItems() {
        this._service.GetItemsByUri('').subscribe(data =>
            this.items = data);
    }
}
