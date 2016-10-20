import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../Constants';


@Component({
    selector: 'maavaron',
    templateUrl: 'maavaron.component.html',
    styleUrls: ['maavaron.component.css'],
})
export class Maavaron implements OnInit, OnDestroy, AfterViewInit {
    @Input() serviceName: string = '10tv';
    private _isVisible: boolean = false;

    constructor(
        public route: ActivatedRoute, http: Http, private myElement: ElementRef
    ) {
        //
    }

    ngOnInit() {
        //

    }

    ngAfterViewInit() {
        //

    }

    ngOnDestroy() {
        //
    }

}
