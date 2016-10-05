import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { SectionService } from '../services/section.service';
@Component({
    selector: 'section',
    templateUrl: 'section.component.html'
})
export class SectionComponent implements OnInit {
    private _currentId: number;
    private _service: SectionService;
    items: any[];
    constructor(public route: ActivatedRoute, http: Http) {
        this._service = new SectionService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
    }
    getItems() {
        this._service.GetItemsByUri('').subscribe(data =>
            this.items = data);
    }
}
