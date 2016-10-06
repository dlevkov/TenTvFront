import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../../common/Constants';

@Injectable()
export class SectionService {
    private _dataDomain: string = Constants.DATA_DOMAIN;

    constructor( @Inject(Http) private _http: Http) { }

    GetItemsByUri(uri: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._dataDomain + uri)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}