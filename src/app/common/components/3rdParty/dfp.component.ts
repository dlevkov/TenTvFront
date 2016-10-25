import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../Constants';
import { Maavaron } from './maavaron.component';


@Component({
    selector: 'dfp',
    template: `
    <div id="{{placeHolderId}}" [ngStyle]="dfpStyle" [class]='"mainDfpItem"'></div>
  `
})
export class DfpMain implements OnInit, OnDestroy, AfterViewInit {
    @Input() serviceName: string = '10tv';
    @Input() placeHolderId: string = '';
    @Input() dfpObjectName: string = 'main';
    @Input() dfpStyle: string = '';
    @Input() maavaron: Maavaron;

    private _dfpRef: any[];
    private _isVisible: boolean = false;
    private _currentResolution: number[] = [];
    private slotName: string;
    private adSize: number[] = [];
    private adUnitName: string;
    private _loadingTimeout: number = Constants.DFPLOADINGTIMEOUT;
    private _count: number = 0;
    private _adUnitsCollectionIndex: any;

    constructor(
        public route: ActivatedRoute, http: Http, private myElement: ElementRef
    ) {
        //
    }

    ngOnInit() {
        //

    }

    ngAfterViewInit() {

        this.generateDfpParams();
        let unit = this.setDfpParams();

    }

    setDfpParams(): any {
        let unit = new window['AdUnitsCollection']();
        this._adUnitsCollectionIndex = window['AdUnitsCollectionIndex'];
        this._adUnitsCollectionIndex.getUnitsCount();

        unit.objectName = this.dfpObjectName;
        unit.slotName = this.placeHolderId;
        unit.adSize = this.adSize;
        unit.adUnitName = this.adUnitName;

        this._adUnitsCollectionIndex.list.push(unit);
        return unit;
    }

    //
    ngOnDestroy() {
        //
    }

    //
    getResolution() {
        this._currentResolution.length = 0;
        this._currentResolution = [screen.width, screen.height];
    }

    //
    getMainAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(320);
                res.push(50);
                break;
        }
        return res;

    }

    //
    getArticleAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(300);
                res.push(250);
                break;
        }
        return res;
    }

    //
    getMaavaronAdUnitSize() {
        let res = [];

        switch (this._currentResolution[0]) {
            case 2:

                break;

            default:
                res.push(320);
                res.push(568);
                break;
        }
        return res;
    }

    generateDfpParams() {
        this.getResolution();
        switch (this.dfpObjectName) {
            case 'main':
                this.adUnitName = Constants.DFPADUNITSNAMES['strip'];
                this.adSize = this.getMainAdUnitSize();
                break;
            case 'article':
                this.adUnitName = Constants.DFPADUNITSNAMES['box'];
                this.adSize = this.getArticleAdUnitSize();
                break;
            case 'maavaron':
                this.adUnitName = Constants.DFPADUNITSNAMES['maavaron'];
                this.adSize = this.getMaavaronAdUnitSize();
                this.maavaron.setSize(this.adSize);
                break;
            default:
            //

        }


    }


}


