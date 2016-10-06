import { Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


/**
 * (description)
 *
 * @export
 * @class NanaDal
 */
export class Dal {
    /**
     * (description)
     *
     * @private
     * @static
     * @type {NanaDal}
     */
    private static _instance: Dal;

    private _dataDomain: string = 'http://localhost/Nana10MVC/';

    /**
     * (description)
     *
     * @private
     * @type {string}
     */
    private _factoryname: string;
    /**
     * (description)
     *
     * @private
     * @type {number}
     */
    private _itemId: number;



    /**
     * (description)
     *
     * @static
     * @returns {NanaDal} (description)
     */
    public static getInstance(): Dal {
        return Dal._instance;
    }



    /**
     * Creates an instance of NanaDal.
     *
     * @param {Http} _http (description)
     */
    constructor( @Inject(Http) private _http: Http) {
        Dal._instance = this;
    }

    /**
     * Provides params in order to get correct data in getItems()
     *
     * @param {string} _factoryname example: Category, Article
     * @param {number} _itemId (description)
     */
    setFactory(_factoryname: string, _itemId: number) {
        this._factoryname = _factoryname;
        this._itemId = _itemId;
    }
    /**
     * (description)
     *
     * @returns {Observable<any>} (description)
     */
    getItems(): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._dataDomain + this._factoryname + '/' + this._itemId)
            .map(response => response.json())
            .catch(this.handleError);
    }
    GetItemsByUri(uri: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._dataDomain + uri)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getCount(controllerName: string) {
        let uri = this._dataDomain + 'vod/count/get?control=' + controllerName;
        return this._http.get(uri);
    }
    /**
     * (description)
     *
     * @private
     * @param {Response} error (description)
     * @returns (description)
     */
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
