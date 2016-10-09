import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleService } from '../../services/article.service';
import { ParagraphModel } from '../../models/paragraph.model';
import { Constants } from '../../../common/Constants';

@Component({
    selector: 'paragraph',
    templateUrl: 'paragraph.component.html',
})
export class ParagraphComponent implements OnInit {
    @Input() item: ParagraphModel

    ngOnInit() {
        console.log(this.item);

    }
}