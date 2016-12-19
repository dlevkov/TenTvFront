import { Component, OnInit, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-pair',
    templateUrl: 'headline-pair.component.html'
})
export class HeadlinePairComponent implements OnInit {
    @Input() item: HeadlineModel;
    @Input() nextItem: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    loadingUrlNext = Constants.IMAGE_LOADING_URL16_9;
    constructor() { }

    ngOnInit() {
        //
    }

    imageLoaded() {
        setTimeout(() => {
            this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
            this.loadingUrlNext = Constants.GetImagePathByType(this.nextItem.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
        }, this.item.ImageTimeout);

    }
}
