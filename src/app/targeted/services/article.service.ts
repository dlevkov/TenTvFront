import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../../common/Constants';
import { ArticleModel } from '../models/article.model';
import { Dal } from '../../common/services/dal.service';

@Injectable()
export class ArticleService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    GetItemsByUri(uri: string): Observable<ArticleModel> {
        return this._dal.GetItemsByUri(uri)
            .map(data => {
                return new ArticleModel(data);
            });
    }
}