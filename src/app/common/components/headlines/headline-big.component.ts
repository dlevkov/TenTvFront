import { Component, OnInit, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-big',
    templateUrl: 'headline-big.component.html'
})
export class HeadlineBigComponent implements OnInit {
    @Input() item: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    constructor() { }

    ngOnInit() {
        this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
    }
}
