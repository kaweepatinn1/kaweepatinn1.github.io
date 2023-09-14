// a constant used to indicate a function that does nothing
var NOOP = function() {}

// ------------------------------------------------------------------------
//   Find the font family, size and face for the provided node in the
//   HTML dom.  The result object contains fontSize, fontFamily and
//   fontFace entries.
//
function findFont( obj )
{
    var result = new Object();
    if ( obj.currentStyle ) {
        result.fontSize = obj.currentStyle[ 'fontSize' ];
        result.fontFamily = obj.currentStyle[ 'fontFamily' ];
        result.fontFace = obj.currentStyle[ 'fontFace' ];
    } else if ( document.defaultView && document.defaultView.getComputedStyle ) {
        var computedStyle = document.defaultView.getComputedStyle( obj, "" );
        result.fontSize = computedStyle.getPropertyValue( 'font-size' );
        result.fontFamily = computedStyle.getPropertyValue( 'font-family' );
        result.fontFace = computedStyle.getPropertyValue( 'font-face' );
    }
    return result;
}

// ---------------------------------------------------------------------------

/*
    Find the bounds of the specified node in the DOM.  This returns
    an objct with x,y, height and width fields
*/
function findBounds( obj )
{
    var bounds = new Object();
    bounds.x = 0;
    bounds.y = 0;
    bounds.width = obj.scrollWidth;
    bounds.height = obj.scrollHeight;
    if( obj.x != null ) {
        bounds.x = obj.x;
        bounds.y = obj.y;
    }
    else {
        while( obj.offsetLeft != null ) {
            bounds.x += obj.offsetLeft;
            bounds.y += obj.offsetTop;
            if( obj.offsetParent ) {
                obj = obj.offsetParent;
            }
            else {
                break;
            }
        }
    }
            
    // subtract the amount the page is scrolled from position
    if (self.pageYOffset) // all except Explorer
    {
        bounds.x -= self.pageXOffset;
        bounds.y -= self.pageYOffset;
    }
    else if (document.documentElement && document.documentElement.scrollTop)
        // Explorer 6 Strict
    {
        bounds.x -= document.documentElement.scrollLeft;
        bounds.y -= document.documentElement.scrollTop;
    }
    else if (document.body) // all other Explorers
    {
        bounds.x -= document.body.scrollLeft;
        bounds.y -= document.body.scrollTop;
    }

    return bounds;
}

// ---------------------------------------------------------------------------

var isFirefoxPat = /Firefox\/([0-9]+)[.]([0-9]+)[.]([0-9]+)/;
var firFoxArr = isFirefoxPat.exec( navigator.userAgent );
var isSafariPat = /AppleWebKit\/([0-9]+)[.]([0-9]+)/;
var safariArr = isSafariPat.exec( navigator.userAgent );

// ---------------------------------------------------------------------------

/*
    Default implementation does nothing when viewing the webpage normally
*/
var clickTarget = NOOP;
var tellLightroomWhatImagesWeAreUsing = NOOP;
var setActiveImageSize = NOOP;

// ---------------------------------------------------------------------------

var callCallback = NOOP;
var WIN_ENV = false;
var MAC_ENV = false;

// ---------------------------------------------------------------------------

if( window.myCallback != null ){
    MAC_ENV = true;

    // We're being previewed on Mac.  Create a callback
    // function for communicating from the web page into Lightroom.
    callCallback = function() {
        // On Mac we use a special javascript to talk to Lightroom.
        var javascript = 'myCallback.' + arguments[ 0 ] + "( ";
        var j = arguments.length;
        var c = j - 1;
        for( var i = 1; i < j; i++ ) {
            var arg = arguments[ i ];
            if( typeof( arg ) == 'string' ) {
                javascript = javascript + '"' + arg + '"';
            }
            if( typeof( arg ) == 'number' ) {
                javascript = javascript + arg
            }
            if( typeof( arg ) == 'undefined' ) {
                javascript = javascript + 'undefined'
            }
            if( i < c ) {
                javascript = javascript + ", "
            }
        }
        javascript = javascript + " )"
        eval( javascript )
    }
    
    pushresult = function( result ) {
        callCallback( "pushresult", result )
    }
}

// ---------------------------------------------------------------------------

else if( window.AgMode == 'preview' ) {
    WIN_ENV = true;
    // We're being previewed on Windows.  Create a callback
    // function for communicating from the web page into Lightroom.
    callCallback = function() {
        // On windows we use a special lua: URL to talk to Lightroom.
        var lua = arguments[ 0 ] + "( ";
        var j = arguments.length;
        var c = j - 1;
        for( var i = 1; i < j; i++ ) {
            var arg = arguments[ i ];
            if( typeof( arg ) == 'string' ) {
                lua = lua + '"' + arg + '"';
            }
            if( typeof( arg ) == 'number' ) {
                lua = lua + arg
            }
            if( typeof( arg ) == 'undefined' ) {
                lua = lua + 'undefined'
            }
            if( i < c ) {
                lua = lua + ", "
            }
        }
        lua = lua + ")"
        location.href = "lua:" + lua
    }
    
    pushresult = function( result ) {
        location.href = "rsl:" + result;    
    }
}

// ---------------------------------------------------------------------------

/*
    Set up live feedback between Lightroom and the previewed web page.
*/
if( callCallback != NOOP ) {

    setActiveImageSize = function( size ) {
        document.activeImageSize = size;
        callCallback( "setActiveImageSize", size );
    }

    tellLightroomWhatImagesWeAreUsing = function() {

        if( window.myCallback != null ) {
            var imgElements = document.getElementsByTagName( "img" );
            var elsLen = imgElements.length;
            var result = new Array()
            for( i = 0; i < elsLen; i++ ) {
                var element = imgElements[ i ];
                var imageID = element.id;
                // for html validation purposes, we've prepended "ID" to the GUID for this
                // image, so now we strip that off.
                imageID = imageID.substring( 2 );
                result[ i ] = imageID;
            }
            myCallback.setUsedFiles( result );
        }
    }

    clickTarget = function( obj, target, imageID ) {
        if( imageID != null ) {
            // for html validation purposes, we've prepended "ID" to the GUID for this
            // image, so now we strip that off.
            imageID = imageID.substring( 2 );
        }
        var bounds = findBounds( obj );
        var font = findFont( obj );
        callCallback( 'inPlaceEdit', target, bounds.x, bounds.y, bounds.width, bounds.height, font.fontFamily, font.fontSize, imageID )
    }

    AgDebugPrint = function( message ) {
        callCallback( 'AgDebugPrint', message );
    }
}

// ---------------------------------------------------------------------------

if( firFoxArr && ( firFoxArr[1] > 1 || firFoxArr[2] > 4 ) ||
      safariArr ) {
    window.gridOn = NOOP;
    window.gridOff= NOOP;
}
else {
    window.gridOn = function( t, id ) {
        t.agOriginalClassName = t.className;
        t.className =  "selectedThumbnail " + t.className;
    };
    window.gridOff= function( t ) {
        t.className = t.agOriginalClassName;
    };
}

var needThumbImgLink = !isFirefoxPat;


var oldOnLoad = window.onload;
window.onload = function() {
    if( window.AgOnLoad ) {
        window.AgOnLoad();
    }
    if( oldOnLoad ) {
        oldOnLoad();
    }
};

//------------------------------------------------------------

document.liveUpdateImageMaxSize = function( id, value ) {
    var targetArr = id.split(/[ \t\r\n]*,[ \t\r\n]*/);
    for( i = 0; i < targetArr.length; i++ ) {
        var target = targetArr[i];
        var idRegex = new RegExp( "^[#](.+$)" );
        var theId = idRegex.exec( target );
        if( theId && theId[ 1 ] ) {
            var item = document.getElementById( theId[ 1 ] );
            if( item ) {

                // scale image size
                var max = item.width;
                if( item.height > max ) {
                    max = item.height;
                }
                item.width = item.width * value / max;
                item.height = item.height * value / max;
            }
        }
    }


    return "invalidateAllContent";
}

//------------------------------------------------------------

var storedGalleryAuthorURL = "";

document.liveUpdate = function( path, newValue, cssId, property ) {
    // window.alert(path + ' ' + newValue + ' ' + cssId);
    var result = "failed",
        $el;

    // We can handle these all individually
    switch(path){

        case "metadata.galleryTitle.value":
            $el = $("#galleryTitle");
            $el.html(newValue);
            break;

        case "nonCSS.galleryAuthor.value":
            $el = $("#galleryAuthor");
            if(newValue != ""){
                if(storedGalleryAuthorURL != ""){
                    $el.html('<a id="galleryAuthorURL" href="' + storedGalleryAuthorURL + '" target="_blank">by ' + newValue + '</a>');
                }
                else {
                    $el.html("by " + newValue);
                }
            }
            else{
                $el.html("");
            }
            break;

        case "nonCSS.galleryAuthor.url":

            storedGalleryAuthorURL = newValue;

            var currentAuthorContent = $("#galleryAuthor").html();
            if($("#galleryAuthor").find("#galleryAuthorURL").length != false){
                currentAuthorContent = $("#galleryAuthorURL").html();
            }
            $("#galleryAuthor").html("");

            var newAuthorContent = "";
            if(newValue == ""){
                newAuthorContent = currentAuthorContent;
            }
            else{
                newAuthorContent = '<a id="galleryAuthorURL" href="' + newValue + '" target="_blank">' + currentAuthorContent + '</a>';
            }

            $("#galleryAuthor").html(newAuthorContent);

            break;

        case "nonCSS.galleryExtra.value":
            $el = $("#galleryExtra");
            $el.html(newValue);
            break;        

        // Color Palette

        case "appearance.body.background-color":
        case "appearance.header_background.background-color":
        case "appearance.loupeContainer_background.background-color":

            $el = $("html");
            $el.each(
                function(index){
                    this.style.setProperty('background-color', newValue, 'important' );
                }
            );

            $el = $("body");
            $el.each(
                function(index){
                    this.style.setProperty('background-color', newValue, 'important' );
                }
            );

            $el = $("header div.background");
            $el.each(
                function(index){
                    this.style.setProperty('background-color', newValue, 'important' );
                }
            );

            $el = $("#loupeContainer div.background");
            $el.each(
                function(index){
                    this.style.setProperty('background-color', newValue, 'important' );
                }
            );

            result = "invalidateAllContent";
            break;
            
        case "appearance.body.color":

            $el = $("body");
            $el.each(
                function(index){
                    this.style.setProperty('color', newValue, 'important' );
                }
            );
            result = "invalidateAllContent";
            break;
            
        case "appearance.icons.fill":

            $el = $(".custom-colorable");
            $el.each(
                function(index){
                    this.style.setProperty('fill', newValue, 'important' );
                }
            );
            result = "invalidateAllContent";
            break;

        case "appearance.thumbnail.border-color":

            $el = $(".thumb-img");
            $el.each(
                function(index){
                    this.style.setProperty('border-color', newValue, 'important' );
                }
            );
            result = "invalidateAllContent";
            break;              

        // The user changed the thumbnail size
        case "metadata.thumbnailSize.value":

            $el = $("#thumbnailContainer div.thumbnails");
            $el.removeClass("thumbnail-size-sm thumbnail-size-md thumbnail-size-lg").addClass("thumbnail-size-" + newValue);
            window.location.reload(true);
            break;

        // The user changed the header visibility
        case "nonCSS.showHeader":

            $el = $("body");
            var __class = "";
            if(newValue == "true"){
                __class = "has-header";
            }
            $el.removeClass("has-header").addClass(__class);
            break;

        // The user changed the floaty-ness of the header
        case "nonCSS.floatingHeader":

            $el = $("header");
            var __class = "";
            if(newValue == "true"){
                __class = "is-fixed";
            }
            $el.removeClass("is-fixed").addClass(__class);
            $("#thumbnailContainer").css("padding-top", $("header").outerHeight() + "px");
            break;

        // The user changed the photo corners setting
        case "nonCSS.photoCorners":

            $el = $("#loupeContainer");
            var __class = "";
            if(newValue == "true"){
                __class = "show-corners";
            }
            $el.removeClass("show-corners").addClass(__class);
            break;

        // The user changed the pagination style
        case "nonCSS.pagination":
            window.location.reload(true);
            break;

        // The user changed the page size
        case "nonCSS.itemsPerPage":
            window.location.reload(true);
            break;

    }

    return result;
}

//------------------------------------------------------------

document.liveUpdateImageSize = function( imageID, width, height ) {

    var img = document.getElementById( 'ID' + imageID );
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    return "invalidateAllContent";
}

//------------------------------------------------------------

