import { Component, OnInit, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-small',
    templateUrl: 'headline-small.component.html'
})
export class HeadlineSmallComponent implements OnInit {
    @Input() item: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    constructor() { }

    ngOnInit() {
        //
    }

    imageLoaded() {
        setTimeout(() => {
            this.loadingUrl = this.item.MediaStockImageID != null ? Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.Small_130_72) : Constants.IMAGE_LOADING_URL16_9;
        }, this.item.ImageTimeout);

    }
}
