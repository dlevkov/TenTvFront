import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterServiceModel } from '../../../common/models/filter-service.model';
import { Constants } from '../../../common/Constants';
import { Subscription } from 'rxjs/Rx';
import { FilterServiceService } from '../../services/filter-service.service';
import { Http } from '@angular/http';
import { Router, Params, Data } from '@angular/router';
@Component({
    selector: 'filter-service',
    templateUrl: 'filter-service.component.html'
})
export class FilterServiceComponent implements OnInit, OnDestroy {
    private _items: FilterServiceModel[];
    private _loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    private _service: FilterServiceService;
    private _subscriber: Subscription;

    constructor(http: Http, private _router: Router) {
        this._service = new FilterServiceService(http);
    }
    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service
            .GetItemsByUri('TenTvAppFront/service')
            .subscribe(data => {
                this._items = data;
            });
    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
    getChecked(): number[] {
        return this._items.filter(x => x.Checked === true).map(x => x.ServiceID);
    }
    private Redirect() {
        // this._router.navigate()
    }
}
