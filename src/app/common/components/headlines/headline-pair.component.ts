import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-pair',
    templateUrl: 'headline-pair.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})
export class HeadlinePairComponent implements OnInit {
    @Input() item: HeadlineModel;
    @Input() nextItem: HeadlineModel;
    public DoCheck: boolean = true;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
    loadingUrlNext = Constants.IMAGE_LOADING_URL16_9;
    constructor(private myElement: ElementRef) {
    }

    ngOnInit() {
        //
    }

    scrolleEvent(event) {
        if (this.DoCheck && window['nanaHelper'].isScrolledIntoView(this.myElement.nativeElement)) {
            this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
            this.loadingUrlNext = Constants.GetImagePathByType(this.nextItem.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
            this.DoCheck = false;
        }
    }

    imageLoaded() {
        if (this.item.ImageTimeout > 0) {
            setTimeout(() => {
                this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
                this.loadingUrlNext = Constants.GetImagePathByType(this.nextItem.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
            }, this.item.ImageTimeout);
        }

    }
}
