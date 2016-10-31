import { Input, Component, EventEmitter, Output } from '@angular/core';
import { FilterServiceModel } from '../../../common/models/filter-service.model';


@Component({
    selector: 'filter-service-item',
    templateUrl: 'filter-service-item.component.html'
})
export class FilterServiceItemComponent {
    @Input() item: FilterServiceModel;
    @Output() itemChecked = new EventEmitter();

    nandleClick() {
        this.itemChecked.emit();
        console.log('child click');

    }
}
