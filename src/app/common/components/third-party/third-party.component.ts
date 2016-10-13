import { Component, ElementRef } from '@angular/core';


@Component({
    selector: 'third-party',
    template:'<div></div>'
})
export class ThirdPartyComponent  {
   constructor(private myElement: ElementRef) { }


  ngAfterViewInit() {
        var instagram = document.createElement("script");
        instagram.type = "text/javascript";
        instagram.src = "http://platform.instagram.com/en_US/embeds.js";
        this.myElement.nativeElement.appendChild(instagram);

        var twitter = document.createElement("script");
        twitter.type = "text/javascript";
        twitter.src = "http://platform.twitter.com/widgets.js";
        this.myElement.nativeElement.appendChild(twitter);
        
    }

}