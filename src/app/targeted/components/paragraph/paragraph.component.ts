import { Component, OnInit, Input, ElementRef, Sanitizer } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ParagraphModel } from '../../models/paragraph.model';
import { Constants } from '../../../common/Constants';
import { DomSanitizer, SafeHtml, SafeScript } from '@angular/platform-browser';

@Component({
    selector: 'paragraph',
    templateUrl: 'paragraph.component.html',
    styles: [`
     .content {
    width: 100%;
    height: 100%;
    margin: 0px auto;
}
.embed-container {
    height: 100vh;
    width: 100%;
    padding-bottom: 75%;
    position: relative;
}
.embed-container iframe {
    min-width: 100%;
    width: 10px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

            `]
})
export class ParagraphComponent implements OnInit {
    @Input() item: ParagraphModel;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private safeHtml: SafeHtml;

    constructor(private myElement: ElementRef, private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this._loadingUrl = this.item.ImageSrc;
        this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.HTMLEncode(this.item.ParagraphContent));
    

    }
    ngAfterViewInit() {
        // ////example of direct dom injection, please see references in assets/js/3rdParty.js
        // let newNode = document.createElement('div');
        // newNode.className = 'paragraphContent';
        // newNode.innerHTML = this.HTMLEncode(this.item.ParagraphContent);
        // window['nanaHelper'].insertAfter(newNode, this.myElement.nativeElement);
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