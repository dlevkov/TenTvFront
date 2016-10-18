import { Component, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';

@Component({
    selector: 'headline-alert',
    templateUrl: 'headline-alert.component.html',
    styles: [
        `
        .AlertItemLast{
            margin-bottom: 12px; 
        }
        .AlertItem{
            border-bottom: 1px solid #d8d8d8;
        }
        `
    ]
})
export class HeadlineAlertComponent {
    @Input() item: HeadlineModel;
    @Input() countId: number = 0;
}
