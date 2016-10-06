import { ParagraphModel } from '../models/paragraph.model';

export class ArticleModel {
    Paragraphs: Array<ParagraphModel> = [];
    MediaStockImageAlt: string;
    MediaStockImageCredit: string;
    Title: string;
    AuthorName: string;
    SubTitle: string;
    ModifyDateFormatted: string;
    ArticleID: string;
    SectionID: string;
    IconURL2: string;
    IconHref2: string;
    StripeColor: string;
    ServiceName: string;
    ServiceID: number;
    ParagrphID: number;

    constructor(data: any[]) {
        this.MediaStockImageAlt = data[0].MediaStockImageAlt;
        this.MediaStockImageCredit = data[0].MediaStockImageCredit;
        this.Title = data[0].Title;
        this.AuthorName = data[0].AuthorName
        this.SubTitle = data[0].SubTitle;
        this.ModifyDateFormatted = data[0].ModifyDateFormatted;
        this.ArticleID = data[0].ArticleID;
        this.SectionID = data[0].SectionID;
        this.IconURL2 = data[0].IconHref2;
        this.IconHref2 = data[0].IconHref2;
        this.StripeColor = data[0].StripeColor;
        this.ServiceName = data[0].ServiceName;
        this.ServiceID = data[0].ServiceID;
        this.ParagrphID = data[0].ParagrphID;
        data.forEach(element => {
            this.Paragraphs.push(new ParagraphModel(element))
        });
    }
}
