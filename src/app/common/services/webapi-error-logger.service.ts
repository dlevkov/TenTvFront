import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { Dal } from '../services/dal.service';
import { Constants } from '../Constants';

@Injectable()
export class WebApiErrorLogger implements OnDestroy {
    private _dal: Dal;
    private _dataDomain: string = Constants.DATA_DOMAIN;
    private _subscriber: Subscription;
    constructor(private _http: Http) {
        this._dal = new Dal(_http);
    }

    Log(title: string, message: any): boolean {
        // this._http.get('http://localhost/Nana10MVC/TenTvAppFront/errorlog?ErrorDesc=112235')
        if (!this._subscriber)
            this._subscriber = this.sendMessage(message).subscribe();
        return false;
    }
    sendMessage(message: string): Observable<any> {
        return this._http.get(this._dataDomain + 'TenTvAppFront/errorlog?ErrorDesc=' + message)
            .map((res) => {
                return true;
            })
            ;
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();
    }
}



