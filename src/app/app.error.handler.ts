import { ErrorHandler, Injectable } from '@angular/core';
import { WebApiErrorLogger } from './common/services/webapi-error-logger.service';
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private logger: WebApiErrorLogger) { }
    handleError(error) {
        this.logger.Log('custom error ', error);
    }
}