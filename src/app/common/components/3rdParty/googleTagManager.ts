import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { GtmService } from '../../services/gtm.service';

@Component({
    selector: 'tag-manager',
    template: `
    <div></div>
  `
})
export class GoogleTagManager implements OnInit, AfterViewInit {
    private _routeSubscriber: Subscription;
    private _service: GtmService;
    private _subscriber: Subscription;
    private _articleId: string = 'articleId';
    private _sectionId: string = 'sectionId';
    private _urlParams: string = '';

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new GtmService(http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            let typeParam = this.route.snapshot.url[0].path;
            let valueParam = this.route.snapshot.url[1].path;
            switch (typeParam) {
                case 'article':
                    this.getData(this._articleId, valueParam);
                    break;
                case 'section':
                    this.getData(this._sectionId, valueParam);
                    break;
                default:
                    break;
            }

        });
    }
    getData(key, value) {
        this._subscriber = this._service.getGtmData('?' + key + '=' + value).subscribe(data => {
            window['NanaGoogleTag'].setNanaGoogleTagParams(data);
        });
    }
    ngOnInit() {

    }

    ngAfterViewInit() {

    }
    ngOnDestroy() {
        this._subscriber.unsubscribe();
        this._routeSubscriber.unsubscribe();
    }
}
