import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../Constants';


@Component({
    selector: 'dfp',
    template: `
    <div id="{{placeHolderId}}" dfpObjectName="{{dfpObjectName}}" style="{{dfpStyle}}"></div
  `
})
export class DfpMain implements OnInit, OnDestroy, AfterViewInit {
    @Input() serviceName: string = '10tv';
    @Input() placeHolderId: string = '';
    @Input() dfpObjectName: string = 'main';
    @Input() dfpStyle: string = '';

    private dfpRef: any;

    constructor(
        public route: ActivatedRoute, http: Http, private myElement: ElementRef
        ) {
            //
            this.dfpRef = window['AdUnitsCollection'];
    }

    ngOnInit() {
        //

    }

    ngAfterViewInit() {
        this.dfpRef.objectname = this.dfpObjectName;
        this.dfpRef.init();
    //     this.taboolaRef.placeHolderId = this.placeHolderId;
    //     this.taboolaRef.placement =  this.placement;
    //     this.taboolaRef.mode = this.mode;
    //     this.taboolaRef.appendTaboolaHead();
    //     this.taboolaRef.appendTabolaBodyEnd();
    //     this.taboolaRef.appendTaboolaContent();
    }

    ngOnDestroy() {
        //
    }

     AdDiv(id: string, style: string, close: boolean) {
            // init static resources if inread tag
            let prefix = '';
            let inreadAdUnitName = '';
            if (id === 'ad-div-inread-article') {
                let InreadAdUnitList = Constants.DFPADUNITS;
                let currentAdUnit = InreadAdUnitList[this.serviceName];

                if (currentAdUnit != null) {
                    // prefix = "<script>var inreadAdUnitName = '" + currentAdUnit.AdUnitName + "';</script>"; ;
                    inreadAdUnitName = '" + currentAdUnit.AdUnitName + "';
                }   else
                inreadAdUnitName = '';
            }


            // let closeHtml = close
            // ? `<div id='maavaronClose' onclick='Maavaron.hideM();' style='width: 60px;height: 60px;border: 0;position: absolute;margin: 2px 10px 10px 0;cursor: pointer;left:0px;'></div>`
            // : ``;
            // return String.Format("{3}<div id='{0}' style={1}>{2}</div>", id, style, closeHtml, prefix);
        }
}
