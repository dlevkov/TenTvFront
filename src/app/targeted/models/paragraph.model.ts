
export class ParagraphModel {
    MediaStockImageAlt: string;
    MediaStockImageCredit: string;
    Title: string;
    ArticleID: string;
    ServiceName: string;
    ParagrphID: number;
    ParagraphContent: string;
    VideoID: string;
    ThumbPicLink: string;
    PicMediaStockImageAlt: string;
    PicMediaStockImageCredit: string;

    constructor(data: any) {
        this.MediaStockImageAlt = data.MediaStockImageAlt;
        this.MediaStockImageCredit = data.MediaStockImageCredit;
        this.Title = data.Title;
        this.ArticleID = data.ArticleID;
        this.ServiceName = data.ServiceName;
        this.ParagrphID = data.ParagrphID;
        this.ParagraphContent = data.ParagraphContent;
        this.VideoID = data.VideoID;
        this.ThumbPicLink = data.ThumbPicLink;
        this.PicMediaStockImageAlt = data.PicMediaStockImageAlt;
        this.PicMediaStockImageCredit = data.PicMediaStockImageCredit;
    }
}