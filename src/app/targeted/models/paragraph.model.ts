
export class ParagraphModel {
    MediaStockImageAlt: string;
    MediaStockImageCredit: string;
    ParagraphTitle:string;
    ArticleID: string;
    ServiceName: string;
    ParagraphID: number;
    ParagraphContent: string;
    VideoID: string;
    ThumbPicLink: string;
    PicMediaStockImageAlt: string;
    PicMediaStockImageCredit: string;
    DisplayOrder: number;

    constructor(data: any) {
        this.DisplayOrder = data.DisplayOrder;
        this.MediaStockImageAlt = data.MediaStockImageAlt;
        this.MediaStockImageCredit = data.MediaStockImageCredit;
        this.ParagraphTitle = data.ParagraphTitle;
        this.ArticleID = data.ArticleID;
        this.ServiceName = data.ServiceName;
        this.ParagraphID = data.ParagraphID;
        this.ParagraphContent = data.ParagraphContent;
        this.VideoID = data.VideoID;
        this.ThumbPicLink = data.ThumbPicLink;
        this.PicMediaStockImageAlt = data.PicMediaStockImageAlt;
        this.PicMediaStockImageCredit = data.PicMediaStockImageCredit;
    }
}