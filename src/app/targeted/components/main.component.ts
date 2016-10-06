import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { MainService } from '../services/main.service';
import { HeadlineModel } from '../../common/models/headline.model';
import { MainModel } from '../../targeted/models/main.model';
@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    item: MainModel;
    private _currentId: number;
    private _service: MainService;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new MainService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
    }
    getItems() {
        this._service.GetItemsByUri('').subscribe(data =>
            this.item = data);
    }
}
