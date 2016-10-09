import { Component, OnInit, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-main',
    templateUrl: 'headline-main.component.html'
})
export class HeadlineMainComponent implements OnInit {
    @Input() item: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    constructor() { }

    ngOnInit() {
        this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.Main_450_450);
    }
}
