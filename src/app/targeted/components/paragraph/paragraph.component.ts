import { Component, OnInit, Input, ElementRef, Sanitizer } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ParagraphModel } from '../../models/paragraph.model';
import { Constants } from '../../../common/Constants';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'paragraph',
    templateUrl: 'paragraph.component.html'    
})

export class ParagraphComponent implements OnInit {
    @Input() item: ParagraphModel;
    @Input() index: number;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private safeHtml: SafeHtml;

    constructor(private myElement: ElementRef, private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this._loadingUrl = this.item.ImageSrc;
        this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.HTMLEncode(this.item.ParagraphContent));
    }

    HTMLEncode(str) {
        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');

    }

}