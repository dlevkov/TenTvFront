import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Constants } from '../../Constants';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';
import { VideoService } from '../../services/video.service';
import { VideoModel } from '../../models/video.model';
import { ArticleModel } from '../../../targeted/models/article.model';


@Component({
    selector: 'videocasttime',
    templateUrl: 'video.component.html'
})
export class Video implements OnInit, OnDestroy, AfterViewInit {
    item: VideoModel;
    @Input() article: ArticleModel;
    private _casttimeRef: any = window[''];
    private _currentId: number;
    private _subscriber: Subscription;
    private _routeSubscriber: Subscription;
    private _service: VideoService;

    constructor(
        public route: ActivatedRoute, http: Http, private myElement: ElementRef
    ) {
        //
        this._service = new VideoService(http);
        this._routeSubscriber = this.route.params.subscribe(x => {
            this._currentId = +x['id'];
            this.getItems();
        });
    }

    ngOnInit() {
        //

    }

    ngAfterViewInit() {
        //
        // this.init();
    }

    getItems() {
        this._subscriber = this._service.GetItemsByUri('vod/episode/getall?%24top=1&%24filter=Id%20eq%20' + this._currentId)
            .subscribe(data => {
                this.item = data;
                if (typeof data.Id !== 'undefined' && data.Id !== undefined) {
                    this.article.IsVideo = true;
                }
            });

    }

    initVideo() {
        let videoUnit = new window['casttimePlayer']();


        videoUnit.casttimeObject.Title = this.item.Title;
        videoUnit.casttimeObject.SubTitle = this.item.SubTitle;
        videoUnit.casttimeObject.SeasonId = this.item.SeasonId;
        videoUnit.casttimeObject.VideoId = this.item.VideoId;

        videoUnit.init();
    }

    ngOnDestroy() {
        //
    }

}
