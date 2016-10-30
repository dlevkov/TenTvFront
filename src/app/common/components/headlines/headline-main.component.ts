import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-main',
    templateUrl: 'headline-main.component.html'
})
export class HeadlineMainComponent implements OnInit, AfterViewChecked {
    @Input() item: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    private _initialized: boolean = false;
    constructor() { }

    ngOnInit() {
        this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.Main_450_450);
    }

    ngAfterViewChecked() {
        if (!this._initialized) {
            window['TopFour'].hide();
            window.scrollTo(0, 0);
            this._initialized = true;
        }
    }
}
