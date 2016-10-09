import { Component, OnInit, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';
@Component({
    selector: 'headline-main',
    templateUrl: 'headline-main.component.html'
})
export class HeadlineMainComponent implements OnInit {
    @Input() item: HeadlineModel;
    constructor() { }

    ngOnInit() { }
}

