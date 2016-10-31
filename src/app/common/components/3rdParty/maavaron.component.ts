import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../Constants';


@Component({
    selector: 'maavaron',
    templateUrl: 'maavaron.component.html',
    styleUrls: ['maavaron.component.css'],
})
export class Maavaron implements OnInit, OnDestroy, AfterViewInit {
    @Input() serviceName: string = '10tv';
    @Input() suffix: string = '';

    private _isVisible: boolean = true;
    private _isDisabled: boolean = false;
    private width: number = 0;
    private height: number = 0;

    private _currentId: number;
    private _routeSubscriber: Subscription;


    constructor(
        public route: ActivatedRoute, http: Http, private myElement: ElementRef
    ) {
        //
        this._routeSubscriber = this.route.params.subscribe(x => {
            this._isVisible = true;
        });
    }

    ngOnInit() {
        //

    }

    ngAfterViewInit() {
        //
        this.setClosingTimeout();
    }

    ngOnDestroy() {
        //
    }

    setSize(size: number[]) {
        this.width = size[0];
        this.height = size[1];
    }

    setClosingTimeout() {
        let timeout = Constants.MAAVARONTIMEOUT;
        setTimeout(() => {
            this.close();
        }, timeout);
    }

    close() {
        this._isVisible = false;
    }

}
