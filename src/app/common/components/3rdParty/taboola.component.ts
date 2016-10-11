import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'taboola',
    template: `
    <div class="taboolaArticleAnchor"></div>
  `
})
export class Taboola implements OnInit, OnDestroy, AfterViewInit {
    headHtmlString: string = `
  window._taboola = window._taboola || [];
  _taboola.push({article:'auto'});
  !function (e, f, u, i) {
    if (!document.getElementById(i)){
      e.async = 1;
      e.src = u;
      e.id = i;
      f.parentNode.insertBefore(e, f);
    }
  }(document.createElement('script'),
  document.getElementsByTagName('script')[0],
  '//cdn.taboola.com/libtrc/nana10tv-app/loader.js',
  'tb_loader_script');
    `;

    footerHtmlString: string = `
  window._taboola = window._taboola || [];
  _taboola.push({flush: true});
    `;

    underArticleHtmlString: string = `
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
        //
    }

    ngOnInit() {
        //
    }

    ngAfterViewInit() {
        //
        this.appendTaboolaHead();
        this.appendTabolaBodyEnd();
        this.appendUnderArticleUnit();
    }

    appendTaboola() {
        //
    }

    appendUnderArticleUnit() {
        let newNode = document.createElement('div');
        newNode.className = 'taboolaUnderArticle';
        newNode.innerHTML = this.underArticleHtmlString;
        window['nanaHelper'].insertAfter(newNode, this.myElement.nativeElement);
    }

    appendTabolaBodyEnd() {
        let newNode = document.createElement('script');
        newNode.className = 'taboolaFoot';
        newNode.type = 'text/javascript';
        //newNode.async = true;
        newNode.innerHTML = this.footerHtmlString;
        window['nanaHelper'].insertToBodyEnd(newNode);
    }
    appendTaboolaHead() {
        let newNode = document.createElement('script');
        newNode.className = 'taboolaHead';
        newNode.type = 'text/javascript';
        //newNode.async = true;
        newNode.innerHTML = this.headHtmlString;
        window['nanaHelper'].insertToHead(newNode);
    }
    ngOnDestroy() {
        //
    }
}
