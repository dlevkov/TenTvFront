// Load DFP --
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
})();

$nana(document).ready(function() {
    nanaRoute.init();
});

var TopFour = {
    url: 'http://m-dev.nana10.co.il/complex/home',
    elementId: 'topFour',
    init: function() {
        //$nana("#" + TopFour.elementId).load(TopFour.url);
        $nana.ajax({
                method: "GET",
                url: TopFour.url,
                dataType: "html",
                jsonp: true,
            })
            .done(function(data) {
                $nana("#" + TopFour.elementId).html(data);
            });
    },
    hide: function() {
        $nana("#" + TopFour.elementId).hide();
    }
};

TopFour.init();

//casttime native player
function casttimePlayer() {
    this.platform = "unknown";
    this.init = function() {
        this.platform = this.getMobileOperatingSystem();
        if (this.platform === "android" && typeof Android !== "undefined") {
            Android.showWebToast(JSON.stringify(this.casttimeObject));
        } else if (this.platform === "ios" && typeof webkit !== "undefined") {
            webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(this.casttimeObject))
        } else {
            console.log("Platform: " + this.platform);
        }
    };

    this.casttimeObject = {
        Title: "האם ג'ודי הלכה רחוק מדי כדי להגן על בעלה?",
        SubTitle: "היא חלמה להיות הגברת הראשונה של ישראל, אשת הנשיא או ראש הממשלה - אבל כאשר התפוצצה ב\"הארץ\" הפרשה האחרונה, שהובילה לפרישתו של בעלה סילבן שלום - נראה שגם ג'ודי שלום ניר מוזס הרשתה לעצמה לעשות דברים שלא עשתה בעבר. איפה עובר הגבול בין התייצבות לצד בן הזוג, לבין מעשים הפוגעים באחרים?",
        SeasonId: 84,
        UserID: "45E4A9FB-FCE8-88BF-93CC-3650C39DDF28",
        VideoId: 1031083,
        DfpAdUnit: "CDN_10TV",
        DfpAdUnitLive: "CDN_Live"
    };
    this.getMobileOperatingSystem = function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            return "android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "ios";
        }
        return "unknown";
    };
};

var NanaTaboola = {
    objectType: "home",
    headerObject: {},
    insertHeader: function() {
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
        ! function(e, f, u, i) {
            if (!document.getElementById(i)) {
                e.async = 1;
                e.src = u;
                e.id = i;
                f.parentNode.insertBefore(e, f);
            }
        }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/nana10tv-app/loader.js',
            'tb_loader_script');
    },

    insertFooter: function() {
        window._taboola = window._taboola || [];
        _taboola.push({ flush: true });
    },

    initContent(id, placement, mode) {
        window._taboola = window._taboola || [];
        _taboola.push({
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

    changeFontSize: function(zoomin) {
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

var AdUnitsCollectionIndex = {
    list: [],
    currentId: 0,
    count: 0,
    init: function() {
        //
        console.log('dfp init');
        this.getUnitsCount();
        for (let i = 0; i < this.count; i++) {
            this.currentId = i;
            this.list[i].init();
        }
        this.reset();
    },

    reset: function() {
        this.list.length = 0;
        this.currentId = 0;
        this.count = 0;
    },

    getUnitsCount: function() {
        this.count = document.getElementsByTagName('dfp').length;
    }
};

function AdUnitsCollection() {
    this.slotName = "";
    this.slot = null;
    this.objectName = "main";
    this.adSize = [];
    this.adUnitName = "";

    this.init = function() {
        this.initGeneral();
    };

    //
    this.initGeneral = function() {
        googletag.cmd.push(function() {
            // Infinite scroll requires SRA
            googletag.pubads().enableSingleRequest();

            // Disable initial load, we will use refresh() to fetch ads.
            // Calling this function means that display() calls just
            // register the slot as ready, but do not fetch ads for it.
            googletag.pubads().disableInitialLoad();

            // Enable services
            googletag.enableServices();

            var unit = AdUnitsCollectionIndex.list[AdUnitsCollectionIndex.currentId];

            unit.slot = googletag.defineSlot(unit.adUnitName, unit.adSize, unit.slotName).addService(googletag.pubads());
            // Display has to be called before
            // refresh and after the slot div is in the page.
            googletag.display(unit.slotName);
            googletag.pubads().refresh([unit.slot]);
            googletag.pubads().collapseEmptyDivs();
        });
    };

    //
    this.validPosition = function() {
        var res = true;
        res = document.getElementById(this.slotName) !== null ? true : false;
        return res;
    };
}

var nanaRoute = {
    initialized: false,
    routeEvent: document.createEvent("Event"),

    invokeRouteEvent: function(url) {
        //invoke
        if (!this.initialized) return false;
        this.routeEvent.routeUrl = url;
        document.dispatchEvent(this.routeEvent);
    },

    initRouteEvents: function() {
        this.routeEvent.initEvent("RouteEvent", true, true);
        this.initialized = true;
    },

    init: function() {
        this.initRouteEvents();
        document.addEventListener("RouteEvent", castTimeHelper.routeHandler, false);
    },
};

var castTimeHelper = {
    platform: '',
    routeHandler: function(data) {
        this.platform = casttimePlayer.getMobileOperatingSystem();
        if (this.platform === "android" && typeof Android !== "undefined") {
            Android.webPageUpdated(data.routeUrl);
        } else if (this.platform === "ios" && typeof webkit !== "undefined") {
            webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify({'routeData': data.routeUrl}));
        } else {
            console.log("Route: " + data.routeUrl);
        }
    },
    //
    toggleServiceFilter: function() {
        window.angularComponentRef.zone.run(() => { window.angularComponentRef.component.showFilter(); })
    },

    //
    changeFontSize: function(zoomin) {
        nanaHelper.changeFontSize(zoomin);
    }

};

var contentParser = {
    scriptList: [],
    scriptSrcList: [],
    count: 0,
    length: 0,
    contentScript: function(content) {
        let script = $nana(content).filter('script').attr('class', 'third-party');
        contentParser.count++;
        contentParser.scriptList.push(script);
        if (contentParser.count === contentParser.length) {
            let result = [];
            $nana.each(contentParser.scriptList, function(i, item) {
                if ($nana.inArray(item.attr('src'), contentParser.scriptSrcList) == -1) {
                    contentParser.scriptSrcList.push(item.attr('src'));
                    result.push(item);
                }
            });
            $nana("head").append(result);
        }
    }
};