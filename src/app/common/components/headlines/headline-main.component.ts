import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
import { Constants } from '../../Constants';
import { ImageTypes } from '../../Enums';
import { HeadlineBase, CustomBaseModel } from './headline-base.component';
@Component({
    selector: 'headline-main',
    templateUrl: 'headline-main.component.html'
})
export class HeadlineMainComponent {
    @Input() item: HeadlineModel;
    changedToRealImage: boolean = false;
    private _basic: HeadlineBase;
    private _baseModel = new CustomBaseModel();
    private _imageType = ImageTypes.Main_450_450;
    constructor(private myElement: ElementRef) {
        this._basic = new HeadlineBase(myElement, this._baseModel);
    }
    scrolleEvent(event) {
        if (!this.changedToRealImage && this.isVisible) {
             this.loadingUrl = Constants.GetImagePathByType(this.item.MediaStockImageID, this._imageType);
            this.changedToRealImage = true;
        }
    }
    imageLoaded() {
        if (this.item.ImageTimeout > 0 && !this.changedToRealImage) {
            setTimeout(() => {
                this.loadUrl();
                this.changedToRealImage = true;
            }, this.item.ImageTimeout);
        }
    }
    get isVisible() {
        return this._basic.isVisible();
    }
    get loadingUrl() {
        return this._baseModel.loadingUrl;
    }
    private loadUrl() {
        this._basic.loadUrl(this.item.MediaStockImageID, this._imageType);
    }
    set loadingUrl(value: string) {
        this._baseModel.loadingUrl = value;
    }
}
