import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { SectionService } from '../services/section.service';
import { SectionModel } from '../models/section.model';

@Component({
    selector: 'section',
    templateUrl: 'section.component.html'
})
export class SectionComponent implements OnInit {
    item: SectionModel;
    private _currentId: number;
    private _service: SectionService;

    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new SectionService(http);
        console.log('section ctor');
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    getItems() {
        this._service.GetItemsByUri('TenTvAppFront/section?%24filter=SectionID%20eq%2013118&%24orderby=DisplayOrder%20desc').subscribe(data =>
            this.item = data);
    }
}
