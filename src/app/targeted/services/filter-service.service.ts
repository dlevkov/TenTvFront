import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Dal } from '../../common/services/dal.service';
import { FilterServiceModel } from '../../common/models/filter-service.model';


@Injectable()
export class FilterServiceService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    GetItemsByUri(uri: string) {
        return this._dal.GetItemsByUri(uri)
         .map((items) => {
                let result: Array<FilterServiceModel> = [];
                let counter = 0;
                if (items) {
                    items.forEach((item) => {
                        item.CounterId = counter;
                        result.push(new FilterServiceModel(item));
                        counter++;
                    });
                }
                return result;
            });
    }
}
