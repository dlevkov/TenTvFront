import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';
import { HeadlineBase, CustomBaseModel } from './headline-base.component';
@Component({
    selector: 'headline-pair',
    templateUrl: 'headline-pair.component.html',
    host: {
        '(window:scroll)': 'scrolleEvent($event)'
    }
})
export class HeadlinePairComponent {
    @Input() item: HeadlineModel;
    @Input() nextItem: HeadlineModel;
    _changedToRealImage: boolean = false;
    private _basic: HeadlineBase;
    private _baseModel = new CustomBaseModel();
    private _imageType = ImageTypes.HeadlIne_Big_460_258;

    constructor(private myElement: ElementRef) {
        this._basic = new HeadlineBase(myElement, this._baseModel);
    }


    scrolleEvent(event) {
        if (!this._changedToRealImage && this.isVisible) {
            this.loadUrls();
        }
    }

    imageLoaded() {
        if (this.item.ImageTimeout > 0 && !this._changedToRealImage) {
            setTimeout(() => {
                this.loadUrls();
            }, this.item.ImageTimeout);
        }

    }
    private loadUrls() {
        this._basic.loadUrl(this.item.MediaStockImageID, this._imageType, this.nextItem.MediaStockImageID); // load pair of images
        this._changedToRealImage = true;
    }

    get isVisible() {
        return this._basic.isVisible();
    }

    get loadingUrl() {
        return this._baseModel.loadingUrl;
    }
    set loadingUrl(value: string) {
        this._baseModel.loadingUrl = value;
    }

    get loadingUrlNext() {
        return this._baseModel.loadingUrlNext;
    }
    set loadingUrlNext(value: string) {
        this._baseModel.loadingUrlNext = value;
    }
}
