import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { FilterServiceModel } from '../../../common/models/filter-service.model';
import { Constants } from '../../../common/Constants';
import { Subscription } from 'rxjs/Rx';
import { FilterServiceService } from '../../services/filter-service.service';
import { MainModel } from '../../../targeted/models/main.model';
import { Http } from '@angular/http';
import { Router, Params, Data } from '@angular/router';
@Component({
    selector: 'filter-service',
    templateUrl: 'filter-service.component.html'
})
export class FilterServiceComponent implements OnInit, OnDestroy {
    @Input() mainModel: MainModel;
    private _items: FilterServiceModel[];
    private _loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    private _service: FilterServiceService;
    private _subscriber: Subscription;
    private _isVisible: boolean = false;
    private _sids: number[] = [];
    private _generatedId: string;

    constructor(http: Http, private _router: Router, private _ngZone: NgZone) {
        this._service = new FilterServiceService(http);
        window.angularComponentRef = { component: this, zone: _ngZone };
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
    getChecked() {
        this._sids = this._items.filter(x => x.Checked === true).map(x => x.ServiceID);
    }

    showFilter(data: String) {
        this._ngZone.run(() => {
            this.setVisible();
        });
    }

    private setVisible() {
        this._isVisible = true;
        window.scrollTo(0, 0);
    }
    private Redirect() {
        this._isVisible = false;
        this.mainModel.setFiltered();
        let seed = new Date().getMilliseconds();
        this.getChecked();
        this.getId();
        // TODO, DEVTEAM, make router work properly
        // this._router.navigate(['/mainfiltered/' + this._generatedId, { data: this._sids }]);
        window.location.href = '/mainfiltered/' + this._generatedId + ';data=' + this._sids.join(',');
    }
    private getId() {
        this._generatedId = this._sids.join('');
    }
}
