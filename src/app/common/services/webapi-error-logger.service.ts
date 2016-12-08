import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Dal } from '../services/dal.service';
import { GtmModel } from '../models/gtm.model';


@Injectable()
export class WebApiErrorLogger {
    private _dal: Dal;

    constructor(private _http: Http) {
        this._dal = new Dal(_http);
    }

    Log(title: string, message: any): boolean {
        this._http.post('Logger/log', { title, message })
            .catch(this._dal.handleError);
        return false;
    }
}



