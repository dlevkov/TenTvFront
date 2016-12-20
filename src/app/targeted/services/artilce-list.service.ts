import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
                    data.forEach((item, index) => {
                        // item.ImageTimeout = 500 + Math.floor(index / 5) * 50;
                        item.ImageTimeout = -1;
                        items.push(new ArticleListModel(item));
                    });
                }
                return items;
            });
    }
}