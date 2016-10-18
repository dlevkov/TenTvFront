/**
 * MainModel
 */
import { Constants } from '../../common/Constants';

export class HeadlineModel {
    readonly HEADLINETYPES: any =
    {
        Big: 10,
        Video: 1,  // temporary replaced by standard item in views
        Main: 2,
        Ad: 8,
        Pair: 9,
        Small: 0,
        Alert: 6
    };
    DestArticleID?: number;
    DisplayOrder?: number;
    Title?: string;
    PrimeTag?: string;
    SubTitle?: string;
    StripeColor?: string;
    ServiceID?: number;
    HebServiceName?: string;
    MediaStockImageID?: number;
    MediaStockImageAlt?: string;
    MediaStockImageCredit?: string;
    VideoID?: number;
    DisplaySigns?: number;
    LastModifyDate?: string;
    CounterId: number;
    isSmall(): boolean {
        return this.DisplaySigns === this.HEADLINETYPES.Small;
    }

    isAlert(): boolean {
        return this.DisplaySigns === this.HEADLINETYPES.Alert;
    }

    isAd(): boolean {
        return this.DisplaySigns === this.HEADLINETYPES.Ad;
    }

    isAdSecond(): boolean {
        return this.DisplaySigns === this.HEADLINETYPES.Ad;
    }

    isPair(): boolean {
        return this.DisplaySigns === this.HEADLINETYPES.Pair;
    }

    constructor(parameters) {
        this.DestArticleID = parameters.DestArticleID;
        this.DisplayOrder = parameters.DisplayOrder;
        this.Title = parameters.Title;
        this.PrimeTag = parameters.PrimeTag;
        this.SubTitle = parameters.SubTitle;
        this.StripeColor = parameters.StripeColor;
        this.ServiceID = parameters.ServiceID;
        this.HebServiceName = parameters.HebServiceName;
        this.MediaStockImageID = parameters.MediaStockImageID;
        this.MediaStockImageAlt = parameters.MediaStockImageAlt;
        this.MediaStockImageCredit = parameters.MediaStockImageCredit;
        this.VideoID = parameters.VideoID;
        this.DisplaySigns = parameters.DisplaySigns;
        this.LastModifyDate = parameters.LastModifyDate;
        this.CounterId = parameters.Id;
    }
}
