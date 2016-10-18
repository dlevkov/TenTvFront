import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Dal } from '../services/dal.service';
import { TwitterModel } from '../models/twitter.model';

@Injectable()
export class TwitterService {
    private _dal: Dal;

    constructor(http: Http) {
        this._dal = new Dal(http);
    }

    pollITwitts() {
        return Observable.interval(1000 * 1)
            .flatMap(() => this._dal.GetItemsByUri('TenTvAppFront/Twitts'))
            .retry(5)
            .map((items) => {
                let result: Array<TwitterModel> = [];
                let counter = 0;
                if (items) {
                    items.forEach((item) => {
                        item.CounterId = counter;
                        result.push(new TwitterModel(item));
                        counter++;
                    });
                }
                return result;
            });

    }
}
