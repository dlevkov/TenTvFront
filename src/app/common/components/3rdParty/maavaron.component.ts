import { Component, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../Constants';


@Component({
    selector: 'maavaron',
    templateUrl: 'maavaron.component.html',
    styleUrls: ['maavaron.component.css'],
})
export class Maavaron implements AfterViewInit {
    @Input() serviceName: string = '10tv';
    @Input() suffix: string = '';

    private _isVisible: boolean = true;
    private _isDisabled: boolean = false;
    private width: number = 0;
    private height: number = 0;

    private _currentId: number;
    private _routeSubscriber: Subscription;


    constructor(
        public route: ActivatedRoute) {
        //
        this._routeSubscriber = this.route.params.subscribe(x => {
            this._isVisible = true;
        });
    }

    ngAfterViewInit() {
        //
        this.setClosingTimeout();
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
