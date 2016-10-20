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
        this.loadingUrl = this.item.MediaStockImageID != null ? Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.Headline_Small_303_165) : null;
    }
}
