import { Component, Input } from '@angular/core';
import { HeadlineModel } from '../../models/headline.model';

@Component({
    selector: 'headline-alert',
    templateUrl: 'headline-alert.component.html'
})
export class HeadlineAlertComponent  {
    @Input() item: HeadlineModel;
}
