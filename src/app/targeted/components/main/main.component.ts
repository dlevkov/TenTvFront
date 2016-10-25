import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';

import { MainService } from '../../services/main.service';
import { HeadlineModel } from '../../../common/models/headline.model';
import { MainModel } from '../../../targeted/models/main.model';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    @Input() showTwitter: boolean = true;
    item: MainModel;
    DfpId: number = 0;
    private _service: MainService;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new MainService(http);
    }

    generateDfpId(): number {
        return this.DfpId++;
    }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/main?%24orderby=DisplayOrder%20asc')
            .subscribe(data => {
                this.item = data;
            });
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
        console.log('main detor');
        
        
    }
}
