import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Taboola } from '../../Taboola';

@Component({
    selector: 'taboola',
    template: `
    <div id="taboola-under-article"></div>
  `
})
export class TaboolaMain implements OnInit, OnDestroy, AfterViewInit {
    objectType: string = 'article';
    taboolaRef: Taboola;

    constructor(public route: ActivatedRoute, http: Http, private myElement: ElementRef) {
        //
    }

    ngOnInit() {
        //
        this.taboolaRef = new Taboola();
        this.taboolaRef.objectType = this.objectType;
    }

    ngAfterViewInit() {
        this.taboolaRef.placeHolderId = 'taboola-under-article';
        this.taboolaRef.placement =  'Under Article';
        this.taboolaRef.mode = 'thumbnails-c';
        this.taboolaRef.appendTaboolaHead();
        this.taboolaRef.appendTabolaBodyEnd();
        this.taboolaRef.appendTaboolaContent()
    }

    ngOnDestroy() {
        //
    }
}
