var nanaHelper = {

    //create function, it expects 2 values.
    insertAfter: function (newElement, targetElement) {

        //setTimeout(function () {

        //
        targetElement = targetElement.getElementsByClassName("anchor")[0];

        //target is what you want it to go after. Look for this elements parent.
        var parent = targetElement.parentNode;

        //if the parents lastchild is the targetElement...
        if (parent.lastchild == targetElement) {
            //add the newElement after the target element.
            parent.appendChild(newElement);
        } else {
            // else the target has siblings, insert the new element between the target and it's next sibling.
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
        //}, 3000);
    },

    insertBefore: function (newElement, targetElement) {
        document.body.insertBefore(newElement, targetElement.childNodes[0]);
    },

    insertToHead: function (newElement) {
        document.getElementsByTagName('head')[0].appendChild(newElement);
    },

    insertToBodyStart: function (newElement) {
        document.body.insertBefore(newElement, document.body.childNodes[0]);
    },

    insertToBodyEnd: function (newElement) {
        document.body.appendChild(newElement);
    }
};

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