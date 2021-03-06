import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../../common/Constants';
import { MainModel } from '../models/main.model';
import { Dal } from '../../common/services/dal.service';

@Injectable()
export class MainService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    GetItemsByUri(uri: string) {
        ;
        return this._dal.GetItemsByUri(uri)
            .map(data => {
                return new MainModel(data);
            });
    }
}
