import { HeadlineModel } from '../../common/models/headline.model';

export class MainModel {
    Headlines: HeadlineModel[] = [];
    adFirst: boolean = false;
    headlinePushValid: boolean = true;
    AlertHeadlines: HeadlineModel[] = [];
    PairtHeadlines: HeadlineModel[] = [];
    AlertCounter: number = 0;
    ItemCounter: number = 0;

    constructor(data) {
        data.forEach(element => {
            this.headlinePushValid = true;
            element.Id = this.ItemCounter++;
            let headline = new HeadlineModel(element);
            headline.AdsSecond = this.adFirst;

            // validate and agrigate
            this.handleAlerts(headline, element);
            this.handlePairs(headline, element);

            if (this.headlinePushValid) this.Headlines.push(headline);

            // handle ads business logic
            this.handleAds(headline, element);


        });
        this.reorganizeModel();
    }

    reorganizeModel() {
        this.reorganizeAlerts();
        this.reorganizePairs();
    }

    reorganizeAlerts() {
        //
        let i = 1;
        this.AlertHeadlines.forEach(element => {
            this.Headlines.splice(i++, 0, element);
        });
    }

    reorganizePairs() {
        //
        let pairStart = true;
        let i: number;

        if (this.PairtHeadlines.length % 2 > 0) this.PairtHeadlines.pop();

        this.PairtHeadlines.forEach(element => {
            i = pairStart ? element.CounterId : i + 1;
            element.PairStart = pairStart;
            this.Headlines.splice(i, 0, element);
            pairStart = !pairStart;
        });
    }

    handleAlerts(headline: HeadlineModel, element: any) {
        if (headline.HEADLINETYPES[element.DisplaySigns] === 'Alert') {
            headline.AlertId = this.AlertCounter++;
            this.AlertHeadlines.push(headline);
            this.headlinePushValid = false;
        }
    }

    handlePairs(headline: HeadlineModel, element: any) {
        if (headline.HEADLINETYPES[element.DisplaySigns] === 'Pair') {
            this.PairtHeadlines.push(headline);
            this.headlinePushValid = false;
        }
    }

    handleAds(headline: HeadlineModel, element: any) {
        if (headline.HEADLINETYPES[element.DisplaySigns] === 'Ad') {
            this.adFirst = true;
        }
    }
}
