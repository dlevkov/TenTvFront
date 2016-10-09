import { ParagraphModel } from '../models/paragraph.model';
import { Constants } from '../../common/Constants';
import { ImageTypes } from '../../common/Enums';

export class ArticleModel {
    Paragraphs: Array<ParagraphModel> = [];
    MediaStockImageAlt: string;
    MediaStockImageCredit: string;
    ArticleMediaStockImageID: string;
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
    ParagraphID: number;
    StripImagePath: string;
    TitlePic: string;


    constructor(data: any[]) {
        this.MediaStockImageAlt = data[0].MediaStockImageAlt;
        this.MediaStockImageCredit = data[0].MediaStockImageCredit;
        this.Title = data[0].Title;
        this.AuthorName = data[0].AuthorName
        this.SubTitle = data[0].SubTitle;
        this.ModifyDateFormatted = data[0].ModifyDateFormatted;
        this.ArticleID = data[0].ArticleID;
        this.SectionID = data[0].SectionID;
        this.IconURL2 = data[0].IconURL2;
        this.IconHref2 = data[0].IconHref2;
        this.StripeColor = data[0].StripeColor;
        this.ServiceName = data[0].ServiceName;
        this.ServiceID = data[0].ServiceID;
        this.ParagraphID = data[0].ParagraphID;
        this.StripImagePath = Constants.NANA_IMAGES_DOMAIN + data[0].IconURL2;
        this.ArticleMediaStockImageID = data[0].ArticleMediaStockImageID;

        this.TitlePic = Constants.GetImagePathByType(this.ArticleMediaStockImageID, ImageTypes.Article_Default);
        console.log(this.TitlePic);
        data.forEach(element => {
            this.Paragraphs.push(new ParagraphModel(element))
        });
    }
}
