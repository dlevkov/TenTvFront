export class Taboola {
    taboolaJsObject: any = window['NanaTaboola'];
    objectType: string = 'home';
    placeHolderId: string;
    placement: string;
    mode: string;

    appendTaboolaContent() {
        this.taboolaJsObject.initContent(this.placeHolderId, this.placement, this.mode);
    }

    appendTabolaBodyEnd() {
        this.taboolaJsObject.insertFooter();
    }

    appendTaboolaHead() {
        this.taboolaJsObject.insertHeader();
    }

}
