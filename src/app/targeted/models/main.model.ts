import { HeadlineModel } from '../../common/models/headline.model';

export class MainModel {
    Headlines: HeadlineModel[] = [];
    constructor(data) {
        let i = 0;
        data.forEach(element => {
            element.Id = i++;
            let headline = new HeadlineModel(element);
            // if( headline.HEADLINETYPES.Alerts === element.DisplaySigns){

            // }
            this.Headlines.push(new HeadlineModel(element));
        });
        this.reorganizeModel();
    }

    reorganizeModel() {
        this.reorganizeAlerts();
        this.reorganizePairs();
    }

    reorganizeAlerts() {
        //

    }

    reorganizePairs() {
        //
    }
}
