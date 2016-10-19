import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../../common/Constants';
import { HeadlineModel } from '../../common/models/headline.model';
import { Dal } from '../../common/services/dal.service';

@Injectable()
export class ArticleListService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    GetItemsByUri(uri: string) {
        return this._dal.GetItemsByUri(uri)
            .map(data => {
                return new HeadlineModel(data);
            });
    }
}