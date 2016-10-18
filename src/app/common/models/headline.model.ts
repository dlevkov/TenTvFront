/**
 * MainModel
 */
import { Constants } from '../../common/Constants';

export class HeadlineModel {
    readonly HEADLINETYPES: any =
    {
        10: 'Big',
        1: 'Video',  // temporary replaced by standard item in views
        2: 'Main',
        8: 'Ad',
        9: 'Pair',
        0: 'Small',
        6: 'Alert'
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
    AdsSecond: boolean = false;
    HeadlineType: string;
    AlertId: number = -1;
    PairStart: boolean = false;
    // isSmall(): boolean {
    //     return this.DisplaySigns === this.HEADLINETYPES.Small;
    // }

    // isBig(): boolean {
    //     return this.DisplaySigns === this.HEADLINETYPES.Big;
    // }

    // isAlert(): boolean {
    //     return this.DisplaySigns === this.HEADLINETYPES.Alert;
    // }

    // isAd(): boolean {
    //     return this.DisplaySigns === this.HEADLINETYPES.Ad && !this.AdsSecond;
    // }

    // isAdSecond(): boolean {
    //     return this.DisplaySigns === this.HEADLINETYPES.Ad && this.AdsSecond;
    // }

    // isPair(): boolean {
    //     return this.DisplaySigns === this.HEADLINETYPES.Pair;
    // }

    getTypeString(): string {
        return this.HEADLINETYPES[this.DisplaySigns];
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
        this.HeadlineType = this.getTypeString();
    }
}
