import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';

@Component({
    selector: 'headline-big',
    templateUrl: 'headline-big.component.html',
     host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})
export class HeadlineBigComponent implements OnInit {
    @Input() item: HeadlineModel;
    loadingUrl = Constants.IMAGE_LOADING_URL16_9;
   constructor(private myElement: ElementRef) {
    }

    ngOnInit() {
        //
    }

    scrolleEvent(event) {
        if (window['nanaHelper'].isScrolledIntoView(this.myElement.nativeElement)) {
            this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
        }
    }

    imageLoaded() {
        if (this.item.ImageTimeout > 0) {
            setTimeout(() => {
                this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, ImageTypes.HeadlIne_Big_460_258);
            }, this.item.ImageTimeout);
        }

    }
}
