/**
 * MainModel
 */
import { Constants } from '../../common/Constants';
import { FilterServiceComponent } from '../../targeted/components/filter-service/filter-service.component';

export class HeadlineModel {
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
    isDfp(i: any, TopFourEndIndex: any): boolean {
        return i !== 0 && (i === TopFourEndIndex || (i - TopFourEndIndex) % 6 === 0);
    }

    getClass(i: any): string {
        return this.HeadlineType;
    }

    isMain(): boolean {
        return this.CounterId === 0;
    }
    isTopFour(): boolean {
        return this.isMain() || (this.CounterId >= 1 && this.CounterId <= 3);
    }

    isSmall(): boolean {
        return !this.isTopFour() && (this.HeadlineType === 'Small' || this.HeadlineType === 'Video');
    }

    isBig(): boolean {
        return !this.isMain() && (this.HeadlineType === 'Big' || this.isTopFour());
    }

    isAlert(): boolean {
        return !this.isTopFour() && this.HeadlineType === 'Alert';
    }

    isAd(): boolean {
        return !this.isTopFour() && this.HeadlineType === 'Ad' && !this.AdsSecond;
    }

    isAdSecond(): boolean {
        return !this.isTopFour() && this.HeadlineType === 'Ad' && this.AdsSecond;
    }

    isPair(): boolean {
        return !this.isTopFour() && this.HeadlineType === 'Pair' && this.PairStart;
    }

    getTypeString(): string {
        return Constants.HEADLINETYPES[this.DisplaySigns];
    }
    constructor(parameters) {
        this.DestArticleID = parameters.DestArticleID;
        this.DisplayOrder = parameters.DisplayOrder;
        this.Title = parameters.Title;
        this.PrimeTag = parameters.PrimeTag;
        this.SubTitle = parameters.SubTitle;
        this.ServiceID = parameters.ServiceID;
        this.StripeColor = FilterServiceComponent.getColorBySid( this.ServiceID) !== '' ? FilterServiceComponent.getColorBySid( this.ServiceID) : parameters.StripeColor;
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
