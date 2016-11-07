import { Component, Input, OnInit } from '@angular/core';
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
export class HeadlineAlertComponent implements OnInit {
    @Input() item: HeadlineModel;
    @Input() countId: number = 0;
    private _lastModifiedTime: string;

    ngOnInit() {
        let ttime = this.item.LastModifyDate.split('T');
        if (ttime.length > 1) {
            let ttimear = ttime[1].split(':');
            ttimear.pop();
            this._lastModifiedTime = ttimear.join(':');
        }
    }


}
