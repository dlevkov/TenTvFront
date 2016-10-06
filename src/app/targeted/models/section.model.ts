import { HeadlineModel } from '../../common/models/headline.model';

export class SectionModel {
    SectionId?: number;
    IconUrl2?: string;
    Headlines: HeadlineModel[] = [];

    constructor(data: any[]) {
        this.SectionId = +data[0].SectionId;
        this.IconUrl2 = data[0].IconUrl2;
        console.log(JSON.stringify(data[0]));

        data.forEach(element => {
            element.DestArticleID = element.ArticleID; // renaming for next operation
            element.LastModifyDate = element.ModifyDate;

            this.Headlines.push(new HeadlineModel(element));
        });
    }
}
