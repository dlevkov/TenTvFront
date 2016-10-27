import { Subject } from 'rxjs/Subject';

export class GlobalEventEmitter extends Subject<any>{
    constructor() {
        super();
    }
    emit(value) { super.next(value); }
}