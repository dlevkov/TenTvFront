import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';


@Component({
    selector: 'instagram',
    template:'<div></div>'
})
export class InstagramComponent  {
   constructor(private myElement: ElementRef) { }


  ngAfterViewInit() {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "http://platform.instagram.com/en_US/embeds.js";
        this.myElement.nativeElement.appendChild(s);
    }

}