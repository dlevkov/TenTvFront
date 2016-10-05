/**
 * MainModel
 */
export class MainModel {
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
    constructor(parameters) {
        this.DestArticleID = parameters.DestArticleID;
        this.DisplayOrder = parameters.DisplayOrder;
    }
}
