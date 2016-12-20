import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-small',
    templateUrl: 'headline-small.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})
export class HeadlineSmallComponent implements OnInit {
    @Input() item: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    public DoCheck: boolean = true;
    constructor(private myElement: ElementRef) {
    }

    ngOnInit() {
        //
    }

    scrolleEvent(event) {
        if (this.DoCheck && window['nanaHelper'].isScrolledIntoView( this.myElement.nativeElement)) {
            this.loadingUrl = this.item.MediaStockImageID != null ? Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.Small_130_72) : Constants.IMAGE_LOADING_URL16_9;
            this.DoCheck = false;
        }
    }

    imageLoaded() {
        if (this.item.ImageTimeout > 0) {
            setTimeout(() => {
                this.loadingUrl = this.item.MediaStockImageID != null ? Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.Small_130_72) : Constants.IMAGE_LOADING_URL16_9;
            }, this.item.ImageTimeout);
        }

    }
}
