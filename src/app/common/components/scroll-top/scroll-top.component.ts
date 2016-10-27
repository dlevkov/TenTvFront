import { Component } from '@angular/core';
import { Constants } from '../../Constants';
import { Routes, Router } from '@angular/router';

@Component({
    selector: 'scroll-top',
    templateUrl: 'scroll-top.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})

export class ScrollTop {
    private _isVisible: boolean = false;


    scrolleEvent(event) {
        this._isVisible = (Constants.SCROLL_POSITION < window.pageYOffset) ? true : false;

    }

    onClick() {
        window.scrollTo(0, 0);
    }
}