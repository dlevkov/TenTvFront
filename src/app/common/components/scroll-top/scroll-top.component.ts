import { Component } from '@angular/core';
import { Constants } from '../../Constants';

@Component({
    selector: 'scroll-top',
    templateUrl: 'scroll-top.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})

export class ScrollTop {
    private _isVisible: boolean = false;
    public static ScrollToTop() {
        $nana('html:not(:animated),body:not(:animated)').animate({ scrollTop: '0px' }, 1000, 'swing');
    }

    scrolleEvent(event) {
        this._isVisible = (Constants.SCROLL_POSITION < window.pageYOffset) ? true : false;
    }

    onClick() {
        ScrollTop.ScrollToTop();
    }

}
