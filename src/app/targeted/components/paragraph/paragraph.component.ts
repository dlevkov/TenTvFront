import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ParagraphModel } from '../../models/paragraph.model';
import { Constants } from '../../../common/Constants';

@Component({
    selector: 'paragraph',
    templateUrl: 'paragraph.component.html'
})
export class ParagraphComponent implements OnInit {
    @Input() item: ParagraphModel;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;

    ngOnInit() {
        this._loadingUrl = this.item.ImageSrc;
    }

}