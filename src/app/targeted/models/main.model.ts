import { HeadlineModel } from '../../common/models/headline.model';

export class MainModel {
    Headlines: HeadlineModel[] = [];
    constructor(data) {
        let i = 0;
        data.forEach(element => {
            element.Id = i++;
            this.Headlines.push(new HeadlineModel(element));
        });
    }
}
