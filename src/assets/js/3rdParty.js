// Load DFP --
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
var googleDfpID = "/9243695/";
(function () {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
})();


var NanaTaboola = {
    objectType: "home",
    headerObject: {},
    insertHeader: function () {
        switch (this.objectType) {
            case "home":
                this.headerObject = { home: 'auto' };
                break;
            case "article":
                this.headerObject = { article: 'auto' };
                break;
            default:
                this.headerObject = { home: 'auto' };
                break;
        }
        window._taboola = window._taboola || [];
        _taboola.push(this.headerObject);
        !function (e, f, u, i) {
            if (!document.getElementById(i)) {
                e.async = 1;
                e.src = u;
                e.id = i;
                f.parentNode.insertBefore(e, f);
            }
        } (document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/nana10tv-app/loader.js',
            'tb_loader_script');
    },

    insertFooter: function () {
        window._taboola = window._taboola || [];
        _taboola.push({ flush: true });
    },

    initContent(id, placement, mode) {
        window._taboola = window._taboola || [];
        _taboola.push(
            {
                mode: mode,
                container: id,
                placement: placement,
                target_type: 'mix'
            });
    }
};
var nanaHelper = {
    currentFontSize: 10,
    maxFontSize: 50,
    minFontSize: 16,
    fontInterval: 2,
    fontSelectors: ['.rsvp_article_inner_content p:not(p.oedoopror)', '.rsvp_article_body_h1', '.rsvp_article_body_h2', '.rsvp_feed_item_title'],

    changeFontSize: function (zoomin) {
        console.log('zoomin: ' + zoomin);
        this.currentFontSize = parseInt($nana(this.fontSelectors[0]).css("font-size"));
        if ((this.currentFontSize >= this.maxFontSize && zoomin) || (this.currentFontSize <= this.minFontSize && !zoomin))
            return false;

        var zoomI = zoomin ? 1 : -1;
        this.currentFontSize += (this.fontInterval * zoomI);
        for (var key in this.fontSelectors) {
            var cancreateZoom = parseInt($nana(this.fontSelectors[key]).css('font-size'));
            cancreateZoom += (this.fontInterval * zoomI);
            $nana(this.fontSelectors[key]).attr("style", "font-size:" + cancreateZoom + "px; line-height:" + cancreateZoom + "px;");
        }
    }
}

var AdUnitsCollection = {
    maavaron: googleDfpID + "Channel10_Interstitial_Ros_test1",
    //liveBox: googleDfpID + "MOBILE_NANA10_LiveBoxVideo_300x250",
    strip: googleDfpID + "Channel10_Banner_General_2",
    box: googleDfpID + "Channel10_Box_300X250",
    slotName: "",
    slot: null,
    currentPosition: {
        width: 0,
        height: 0
    },
    objectName: "main",
    currentResolution: [],

    init: function () {

        switch (this.objectName) {
            case "main":
                this.slot = googletag.defineSlot(AdUnitsCollection.strip, AdUnitsCollection.getMainAdUnitSize(), AdUnitsCollection.slotName).addService(googletag.pubads());
                this.initGeneral();
                break;
            case "article":
                this.slot = googletag.defineSlot(AdUnitsCollection.box, AdUnitsCollection.getArticleAdUnitSize(), AdUnitsCollection.slotName).addService(googletag.pubads());
                this.initGeneral();
                break;
            case "maavaron":
                this.slot = googletag.defineSlot(AdUnitsCollection.maavaron, AdUnitsCollection.getMaavaronAdUnitSize(), AdUnitsCollection.slotName).addService(googletag.pubads());
                this.initGeneral();
                break;
            default:
                this.initGeneral();

        }

    },

    //
    getResolution: function () {
        this.currentResolution.width = screen.width;
        this.currentResolution.height = screen.height;
    },

    //
    getMainAdUnitSize: function () {
        var res = [];
        this.getResolution();

        switch (this.currentResolution.width) {
            case 2:

                break;

            default:
                res.push(320);
                res.push(50);
                break;
        }
        return res;
    },

    //
    getMaavaronAdUnitSize: function () {
        var res = [];
        this.getResolution();

        switch (this.currentResolution.width) {
            case 2:

                break;

            default:
                res.push(320);
                res.push(568);
                break;
        }
        return res;
    },

    //
    getArticleAdUnitSize: function () {
        var res = [];
        this.getResolution();

        switch (this.currentResolution.width) {
            case 2:

                break;

            default:
                res.push(300);
                res.push(250);
                break;
        }
        return res;
    },
    //
    initGeneral: function () {
        googletag.cmd.push(function () {

            // Infinite scroll requires SRA
            googletag.pubads().enableSingleRequest();

            // Disable initial load, we will use refresh() to fetch ads.
            // Calling this function means that display() calls just
            // register the slot as ready, but do not fetch ads for it.
            googletag.pubads().disableInitialLoad();

            // Enable services
            googletag.enableServices();

            // Display has to be called before
            // refresh and after the slot div is in the page.
            googletag.display(AdUnitsCollection.slotName);
            googletag.pubads().refresh([AdUnitsCollection.slot]);
            googletag.pubads().collapseEmptyDivs();
        });
    },

    //
    validPosition: function () {
        var res = true;
        res = document.getElementById(this.slotName) !== null ? true : false;
        return res;
    }
};

var castTimeHelper = {

    //
    init: function () {

    },

    //
    toggleServiceFilter: function () {
        //nanaHelper.toggleServiceFilter();
    },

    //
    changeFontSize: function (zoomin) {

        nanaHelper.changeFontSize(zoomin);
    }


};


