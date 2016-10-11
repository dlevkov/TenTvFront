import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article.model';
import { Constants } from '../../../common/Constants';


@Component({
    selector: 'article',
    templateUrl: 'article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy, AfterViewInit {
    item: ArticleModel;
    private _currentId: number;
    private _service: ArticleService;
    private _subscriber: Subscription;
    private _loadingUrl: string = Constants.IMAGE_LOADING_URL16_9;

    private underArticleHtmlString: string = `
<div id="taboola-under-article"></div>
<script type="text/javascript">
  window._taboola = window._taboola || [];
  _taboola.push({
    mode: 'thumbnails-c',
    container: 'taboola-under-article',
    placement: 'Under Article',
    target_type: 'mix'
  });
</script>
    `;

    constructor(public route: ActivatedRoute, http: Http, private myElement: ElementRef) {
        this._service = new ArticleService(http);
    }

    ngOnInit() {
        this._currentId = +this.route.snapshot.params['id'];
        this.getItems();
    }

    getItems() {
        this._subscriber = this._service.GetItemsByUri('TenTvAppFront/article?$filter=ArticleID eq ' + this._currentId)
            .subscribe(data => {
                this.item = data;
                this._loadingUrl = this.item.TitlePic;
            });

    }

    ngAfterViewInit() {
        //this.appendUnderArticleUnit();
    }

    appendUnderArticleUnit() {
        let newNode = document.createElement('div');
        newNode.className = 'taboolaUnderArticle';
        newNode.innerHTML = this.underArticleHtmlString;
        window['nanaHelper'].insertToBodyEnd(newNode, this.myElement.nativeElement);
    }

    ngOnDestroy() {
        this._subscriber.unsubscribe();

    }
}
