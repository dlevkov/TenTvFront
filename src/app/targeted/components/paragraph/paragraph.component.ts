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
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;
    private safeHtml: SafeHtml;

    constructor(private myElement: ElementRef, private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this._loadingUrl = this.item.ImageSrc;
        this.safeHtml = this._sanitizer.bypassSecurityTrustHtml(this.HTMLEncode(this.item.ParagraphContent));
    }

    ngAfterViewInit() {

        // var s = document.createElement("script");
        // s.type = "text/javascript";
        // s.src = "http://platform.instagram.com/en_US/embeds.js";
        // this.myElement.nativeElement.appendChild(s);

        // ////example of direct dom injection, please see references in assets/js/3rdParty.js
        // let newNode = document.createElement('div');
        // newNode.className = 'paragraphContent';
        // newNode.innerHTML = this.HTMLEncode(this.item.ParagraphContent);
        // window['nanaHelper'].insertAfter(newNode, this.myElement.nativeElement);
    }

    ngAfterViewChecked() {
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