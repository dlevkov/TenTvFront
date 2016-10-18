import { Input, Component } from '@angular/core';
import { FilterServiceModel } from '../../../common/models/filter-service.model';


@Component({
    selector: 'filter-service-item',
    templateUrl: 'filter-service-item.component.html'
})
export class FilterServiceItemComponent {
    @Input() item: FilterServiceModel;
}
