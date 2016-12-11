import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../Constants';


export class Dal {
    private _dataDomain: string = Constants.DATA_DOMAIN;

    constructor(private _http: Http) {

    }

    GetItemsByUri(uri: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._dataDomain + uri)
            .map((res: Response) => res.json())
            .retry(5)
            .catch(this.handleError);
    }
    public handleError(error: Response) {
        // console.error(error);
        // window.location.href = '/main';
        return Observable.throw(error.json().error || 'Server error');
    }
}
