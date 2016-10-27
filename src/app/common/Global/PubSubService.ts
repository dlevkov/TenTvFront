import { GlobalEventEmitter } from './GlobalEventEmitter';
export class PubSubService {
    Stream: any;
    constructor() {
        this.Stream = new GlobalEventEmitter();
    }
}
