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
    private _service: MainService;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new MainService(http);
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

    // isBig(headline: HeadlineModel): boolean {
    //     return headline.CounterId <= 4 && headline.CounterId > 0;
    // }
    // isPair(headline: HeadlineModel): boolean {
    //     return headline.DisplaySigns === 9 && headline.CounterId > 4;
    // }
    // isAlert(headline: HeadlineModel): boolean {
    //     return headline.DisplaySigns === 6 && headline.CounterId > 0;
    // }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}
