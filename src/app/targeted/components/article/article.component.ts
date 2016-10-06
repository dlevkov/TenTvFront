import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article.model';

@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnInit {
    item: ArticleModel;
    private _currentId: number;
    private _service: ArticleService;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new ArticleService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }
    getItems() {
        this._service.GetItemsByUri('/TenTvAppFront/article').subscribe(data =>
            this.item = data);
    }
}
