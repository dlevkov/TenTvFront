var nanaHelper = {

    //create function, it expects 2 values.
    insertAfter: function (newElement, targetElement) {
        //setTimeout(function () {
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