import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Dal } from '../services/dal.service';
import { GtmModel } from '../models/gtm.model';


@Injectable()
export class GtmService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    getGtmData(urlParams): Observable<GtmModel> {
        return this._dal.GetItemsByUri('TenTvAppFront/google-manager' + urlParams)
            .map((items) => {
                let result: GtmModel;
                if (items) {
                    result = new GtmModel(items);
                }
                return result;
            });
    }
}



