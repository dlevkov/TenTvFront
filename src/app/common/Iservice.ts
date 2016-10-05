import { Observable } from 'rxjs/Rx';

export interface IService<T> {
    getAll(skip: number, top: number): Observable<T[]>;
    getCount(controllerName?: string ): Observable<number>;
}
