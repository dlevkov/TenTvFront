import { HeadlineModel } from '../../common/models/headline.model';

export class MainModel {
    HeadlineList: Array<HeadlineModel> = [];
    constructor(data){
        data.forEach(element => {
            this.HeadlineList.push(
                new HeadlineModel(element)
            );
        });
    }
}
