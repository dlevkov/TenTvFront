import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../../common/Constants';
import { ArticleListModel } from '../../targeted/models/article-list.model';
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
                let items: Array<ArticleListModel> = [];
                if (data) {
                    data.forEach((item) => {
                        items.push(new ArticleListModel(item));
                    });
                }
                return items;
            });
    }
}