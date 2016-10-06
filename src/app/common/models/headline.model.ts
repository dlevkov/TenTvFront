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
    }
}
