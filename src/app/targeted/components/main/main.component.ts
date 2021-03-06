import { Component, OnInit, Input, NgZone, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Cookies } from '../../../common/Cookies';
import { MainService } from '../../services/main.service';
import { HeadlineModel } from '../../../common/models/headline.model';
import { MainModel } from '../../../targeted/models/main.model';
import { FilterServiceComponent } from '../filter-service/filter-service.component';

@Component({
    selector: 'main',
    templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnChanges {
    @Input() showTwitter: boolean = true;
    @Input() isInArticle: boolean = false;
    seed: string;
    item: MainModel;
    DfpId: number = 0;
    isFiltered: boolean = false;
    private _service: MainService;
    private _subscriber: Subscription;

    constructor(private http: Http, private _router: Router, private _ngZone: NgZone, public route: ActivatedRoute) {
        this._service = new MainService(this.http);
    }

    generateDfpId(): number {
        return this.DfpId;
    }

    addCounter(): void {
        this.DfpId++;
    }

    ngOnChanges() {
        this.seed = new Date().getMilliseconds().toString();
    }

    ngOnInit() {
        this.seed = new Date().getMilliseconds().toString();
        let data: string = this.route.snapshot.params['data']; // get list of id's as a string splited by ','
        if (typeof data !== 'undefined' && data) {
            this.isFiltered = true;
        }
        this.getItems();
        this.addCounter();
        if (!this.isInArticle) this.initFilter();
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
        console.log('main dtor');
    }

    initFilter() {
        Cookies.getNanaCookie();
        if (Cookies.nanaFilterSids.length > 0 && Cookies.nanaFilterSids.length !== FilterServiceComponent.filterServices.length) this.isFiltered = true; else this.isFiltered = false;
    }

    private handleFilter() {
        window['castTimeHelper'].toggleServiceFilter();
    }
}
