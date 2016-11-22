import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { FilterServiceModel } from '../../../common/models/filter-service.model';
import { Constants } from '../../../common/Constants';
import { Subscription } from 'rxjs/Rx';
import { FilterServiceService } from '../../services/filter-service.service';
import { MainModel } from '../../../targeted/models/main.model';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// import { CookieService } from 'angular2-cookie/core';
import { Cookies } from '../../../common/Cookies'
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
    private _classUpdated: string = '';
    private _clearFilterText = {
        'false': 'סמן הכל',
        'true': 'נקה הכל',
    };
    private _clearFilter: boolean = false;
    private _updateButtonStyle = { 'color': '#585756', 'border-color': '#585756' };
    private _filterCookie: Cookies;
    private _filterCookieData: string;
    private _filterCookieName: string = 'tentvappfilter';
    private _routeSubscriber: Subscription;

    constructor(http: Http, private _router: Router, private _ngZone: NgZone, public route: ActivatedRoute) {
        this._service = new FilterServiceService(http);
        window.angularComponentRef = { component: this, zone: _ngZone };
        this._routeSubscriber = this.route.params.subscribe(x => {
            //this.init();
        });
    }
    ngOnInit() {
        //this.init();
        // this._subscriber = this._service
        //     .GetItemsByUri('TenTvAppFront/service')
        //     .subscribe(data => {
        //         this._items = data;
        //     });
    }

    init() {
        this.initItems();
        this.initUserData();
    }

    ngOnDestroy() {
        // this._subscriber.unsubscribe();
    }
    getChecked() {
        this._sids = this._items.filter(x => x.Checked === true).map(x => x.ServiceID);
    }

    applyChecked() {
        this._items.filter(it => this._sids.indexOf(it.ServiceID) >= 0).forEach(element => {
            element.Checked = true;
        });
    }

    clickCheckbox() {
        this._classUpdated = 'rsvp_changed_status';
        this._updateButtonStyle = { 'color': 'red', 'border-color': 'red' };
        this._clearFilter = true;
        console.log('parent click');
    }


    toggleFilter() {
        this._ngZone.run(() => {
            this.setVisible();
        });
    }

    private initUserData() {
        this._filterCookie = new Cookies();
        this._filterCookie.sCookieName = this._filterCookieName;
        this._filterCookieData = this._filterCookie.getCookie();
        //this._filterCookieData = this._cookieService.get(this._filterCookieName);
        if (this._filterCookieData !== '') {
            this.filterCookieParse();
        }
        this.applyChecked();
    }

    private filterCookieParse() {
        this._filterCookieData.split(',').forEach(element => {
            this._sids.push(+element);
        });
    }

    private clearFilterTextGet() {
        let text = this._clearFilter ? 'true' : 'false';
        return this._clearFilterText[text];
    }

    private toggleclearFilter() {
        this._items.forEach(element => {
            element.Checked = !this._clearFilter;
        });
        this._clearFilter = !this._clearFilter;
    }

    private initItems() {
        this._items = new Array<FilterServiceModel>(
            new FilterServiceModel({ HebServiceName: 'חדשות', ServiceID: 126, ServiceName: 'news', StripeColor: '#f7892d' }),
            new FilterServiceModel({ HebServiceName: 'ערוץ 10', ServiceID: 169, ServiceName: 'news', StripeColor: '#f30373' }),
            new FilterServiceModel({ HebServiceName: 'תרבות ובידור', ServiceID: 123, ServiceName: 'news', StripeColor: '#e68479' }),
            new FilterServiceModel({ HebServiceName: 'אופנה ולייפסטייל', ServiceID: 129, ServiceName: 'news', StripeColor: '#e33194' }),
            new FilterServiceModel({ HebServiceName: 'אונליין', ServiceID: 127, ServiceName: 'news', StripeColor: '#000000' }),
            new FilterServiceModel({ HebServiceName: 'אוכל ורק אוכל', ServiceID: 142, ServiceName: 'news', StripeColor: '#bc024a' }),
            new FilterServiceModel({ HebServiceName: 'סלבס', ServiceID: 216, ServiceName: 'news', StripeColor: '#dcc608' }),
            new FilterServiceModel({ HebServiceName: 'גיימר', ServiceID: 212, ServiceName: 'news', StripeColor: '#5C9DC0' }),
            new FilterServiceModel({ HebServiceName: 'דוקו', ServiceID: 186, ServiceName: 'news', StripeColor: '#f30373' })
            //{ HebServiceName: 'ספורט', ServiceID: 126, ServiceName: 'news', StripeColor: '#0F6F2A' }

        );

    }

    private setVisible() {
        this._isVisible = !this._isVisible;
        window['castTimeHelper'].triggerFilter(this._isVisible);
        if (this._isVisible) this.init();
        window.scrollTo(0, 0);
    }
    private Redirect() {
        this.setVisible();
        this.mainModel.setFiltered();
        let seed = new Date().getMilliseconds();
        this.getChecked();
        this.getId();
        // TODO, DEVTEAM, make router work properly
        this._router.navigate(['/mainfiltered/' + this._generatedId, { data: this._sids }]);
        // window.location.href = '/mainfiltered/' + this._generatedId + ';data=' + this._sids.join(',');
    }
    private getId() {
        this._generatedId = this._sids.join(',');
        this._filterCookie.setCookie(this._generatedId, 2000, 'nana10.co.il');
        //let opt: CookieOptionsArgs = { domain: 'nana10.co.il' }
        //this._cookieService.put(this._filterCookieName, this._generatedId);
    }
}
