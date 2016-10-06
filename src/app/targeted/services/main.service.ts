import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../../common/Constants';
import { MainModel } from '../models/main.model';
import { Dal } from '../../common/services/dal.service';
import { HeadlineModel } from '../../common/models/headline.model';
@Injectable()
export class MainService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    GetItemsByUri(uri: string) {;
        return this._dal.GetItemsByUri(uri)
            .map((seasons: Array<HeadlineModel>) => {
                let result: Array<HeadlineModel> = [];
                if (seasons) {
                    seasons.forEach((season: HeadlineModel) => {
                        result.push(new HeadlineModel(season));
                    });
                }
                return result;
            });
    }
}
