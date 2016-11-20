import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MainService } from '../../services/main.service';
import { HeadlineModel } from '../../../common/models/headline.model';
import { MainModel } from '../../../targeted/models/main.model';
import { FilterServiceComponent } from '../filter-service/filter-service.component';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {
    @Input() showTwitter: boolean = true;
    @Input() isInArticle: boolean = false;
    item: MainModel;
    DfpId: number = 0;
    isFiltered: boolean = false;
    private _service: MainService;
    private _subscriber: Subscription;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new MainService(http);
    }

    generateDfpId(): any {
        let newid = this.DfpId;
        return newid;
    }

    addCounter() {
        this.DfpId++;
    }


    // set generateDfpId(newid: number): any {
    //     this.DfpId = newid;
    // }

    ngOnInit() {
        let data: string = this.route.snapshot.params['data']; // get list of id's as a string splited by ','
        if (typeof data !== 'undefined' && data) {
            this.isFiltered = true;
        }
        this.getItems();
        this.addCounter();
    }
    isSafary() {
        return false;
    }

    getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/main?%24orderby=DisplayOrder%20asc')
            .subscribe(data => {
                this.item = data;
                this.item.isFiltered = this.isFiltered;
            });
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
        window['AdUnitsCollectionIndex'].reset();
        console.log('main detor');
    }

    private handleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }
}
