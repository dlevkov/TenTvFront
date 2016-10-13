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

var AdUnitsCollection = {
    //maavaron: googleDfpID + "MOBILE_NANA10_MAAVARON_320x460",
    //liveBox: googleDfpID + "MOBILE_NANA10_LiveBoxVideo_300x250",
    strip: googleDfpID + "Channel10_Banner_General_2",
    box: googleDfpID + "Channel10_Box_300X250",
    boxCount: -1,
    counter: 0,
    startDisplayPosition: 1000,
    intervalDisplayPosition: 200,
    currentPosition: -1,
    objectName: "main",

    init: function () {

        switch (this.objectName) {
            case "main":
                this.initMain();
                break;
            case "article":
                this.initArticle();
                break;
            default:
                this.initGeneral();

        }

    },

    //
    initArticle: function () {
        googletag.cmd.push(function () {

            // Infinite scroll requires SRA
            googletag.pubads().enableSingleRequest();

            // Disable initial load, we will use refresh() to fetch ads.
            // Calling this function means that display() calls just
            // register the slot as ready, but do not fetch ads for it.
            googletag.pubads().disableInitialLoad();

            // Enable services
            googletag.enableServices();

            //TODO: ANTON, replace by object 
            var slotName = 'ad-div-box';
            var slot = googletag.defineSlot(AdUnitsCollection.box, [300, 250], slotName).addService(googletag.pubads());

            // Display has to be called before
            // refresh and after the slot div is in the page.
            googletag.display(slotName);
            googletag.pubads().refresh([slot]);
            googletag.pubads().collapseEmptyDivs();
        });
    },

    //
    initGeneral: function () {

    },

    //
    initMain: function () {
        if (!this.validPosition()) return false;

        //init dfp objects uf needed
        //TODO: Anton
        googletag.cmd.push(function () {
            // Infinite scroll requires SRA
            googletag.pubads().enableSingleRequest();

            // Disable initial load, we will use refresh() to fetch ads.
            // Calling this function means that display() calls just
            // register the slot as ready, but do not fetch ads for it.
            googletag.pubads().disableInitialLoad();

            // Enable services
            googletag.enableServices();

            //TODO: ANTON, replace by object 
            var slotName = 'ad-div-upper-strip-' + AdUnitsCollection.counter;
            var slot = googletag.defineSlot(AdUnitsCollection.strip, [320, 50], slotName).addService(googletag.pubads());

            // Display has to be called before
            // refresh and after the slot div is in the page.
            googletag.display(slotName);
            googletag.pubads().refresh([slot]);
            googletag.pubads().collapseEmptyDivs();
        });
        this.counter++;
    },

    //
    validPosition: function () {
        var res = false;

        if (this.counter <= this.boxCount && this.currentPosition > this.startDisplayPosition && (this.currentPosition < (this.startDisplayPosition + (this.counter + 1) * this.intervalDisplayPosition))) {
            res = true;
            console.log("current ad count" + this.counter);
        }


        return res;
    }
};


