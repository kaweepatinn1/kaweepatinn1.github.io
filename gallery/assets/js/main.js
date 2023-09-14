

function init(){

    // Let's cache some stuff!
    var _$w = $(window),
        _$body = $("body"),
        _$header = $("header"),
        _$thumbnailContainer = $("#thumbnailContainer"),
        _$thumbnailsParent = $("#thumbnailContainer div.thumbnails"),
        _$thumbnails = [],
        _$loupeContainer = $("#loupeContainer"),
        _$loupeBackground = $("#loupeContainer div.background"),
        _$loupeImageContainer = $("#loupeContainer div.image-container"),
        _$loupeInfoContainer = $("#loupeContainer div.info-container"),
        _$loupeMeta = $("#loupeMeta"),
        _$buttonPrev = $("#buttonPrev"),
        _$hotspotPrevLoupe = $("#hotspotPrevLoupe"),
        _$buttonPrevSideLoupe = $("#buttonPrevSideLoupe"),
        _$buttonNext = $("#buttonNext"),
        _$hotspotNextLoupe = $("#hotspotNextLoupe"),
        _$buttonNextSideLoupe = $("#buttonNextSideLoupe"),
        _$countCurrent = $("#countCurrent"),
        _$countTotal = $("#countTotal"),
        _$buttonClose = $("#loupeCloseButton");

    var i,
        _isOpen = false,
        _$targetThumb,
        _$loupeImage,
        _loupeIsTransitioning = false,
        _currentImageIndex,
        _autoViewThumb,
        _paginationStyle = "none",
        _viewportHeight = 0,
        _viewportWidth = 0,
        _thumbsToLoad = 0,
        _lastLoadedThumbIndex = -1,
        _fixedHeader = _$header.hasClass("is-fixed"),
        _$lastLoadedThumb;

    // Set the current viewport dimensions
    _viewportHeight = _$w.height();
    _viewportWidth = _$w.width();
    _$w.on(
        "resize",
        onWindowResize
    );

    // create a global scroll handler so that we can make the header more compact as the user scrolls down the page
    _$w.on(
        "scroll",
        onWindowScroll
    );

    // Check the pagination style    
    if(_$body.attr("data-pagination-style")){
        _paginationStyle = _$body.attr("data-pagination-style");
    }

    // Loop through the global JSON object
    for(i = 0; i < LR.images.length; i++) {
        // Set some new properties
        LR.images[i].index = i;
        LR.images[i].thumbIsLoading = false;
        LR.images[i].thumbHasLoaded = false;
        // Re-set the title if needed
        if(LR.images[i].title == "nil"){
            LR.images[i].title = "";
        }
        // Re-set the caption if needed
        if(LR.images[i].caption == "nil"){
            LR.images[i].caption = "";
        }
        // Create the individual thumbnail partial
        LR.images[i].$thumbnail = $('<div class="thumbnail" data-large-img="images/large/'+ LR.images[i].exportFilename +'.jpg" data-id="ID'+ LR.images[i].id +'" data-title="' + LR.images[i].title + '" data-caption="' + LR.images[i].caption + '"><img class="thumb-img" src="" /></div>');
        LR.images[i].$thumbnail.data("index", i);
        // Isolate the actual thumbnail image
        LR.images[i].$thumbnailImg = $(LR.images[i].$thumbnail.find("img")[0]);
        LR.images[i].$thumbnailImg.data("index", i);
        LR.images[i].$thumbnailImg.on(
            "load",
            onThumbnailImgLoad
        );
        LR.images[i].$thumbnailImg.on(
            "error",
            onThumbnailImgError
        );
        _$thumbnails.push(LR.images[i].$thumbnail);
    }

    // Check for an existing hash
    if(window.location.hash != ""){
        var _parts = window.location.hash.split("/");
        switch(_parts[1]){
            case "view" :
                for(var i = 0; i < LR.images.length; i++){
                    if(LR.images[i].$thumbnail.attr("data-id") == _parts[2]){
                        _autoViewThumb = LR.images[i].$thumbnail;
                        break;
                    }
                }
                break;
        }
    }

    // Render the page based on the user-selected pagination style
    switch(_paginationStyle){
        
        case "none":
            renderAllThumbnails();
            break;

        case "scroll":
            initLoadOnScroll();
            break; 
    }

    function renderAllThumbnails() {
        for(var i = 0; i < LR.images.length; i++){
            _$thumbnailsParent.append(LR.images[i].$thumbnail);
            LR.images[i].$thumbnail.on(
                "click",
                onThumbnailClick
            );
            LR.images[i].$thumbnailImg.attr(
                "src",
                "images/thumbnails/" + LR.images[i].exportFilename + ".jpg"
            );
            _lastLoadedThumbIndex = LR.images[i].index;
        }
    }

    // Pagination Style: "scroll"

    function initLoadOnScroll() {

        if(LR.images.length == 0){
            return;
        }

        var _bodyHeight = _$body.height();

        // Get the scrollbar width
        var _scrollDiv = document.createElement("div");
        _scrollDiv.className = "scrollbar-measure";
        document.body.appendChild(_scrollDiv);
        var _scrollbarWidth = _scrollDiv.offsetWidth - _scrollDiv.clientWidth;
        document.body.removeChild(_scrollDiv);

        // simulate a scrollbar
        _$body.css("padding-right", _scrollbarWidth+"px");

        // load the first image
        _$thumbnailsParent.append(LR.images[0].$thumbnail);
        LR.images[0].$thumbnail.on(
            "click",
            onThumbnailClick
        );
        LR.images[0].$thumbnailImg.attr(
            "src",
            "images/thumbnails/" + LR.images[0].exportFilename + ".jpg"
        );
        _$lastLoadedThumb = LR.images[0].$thumbnail;
        _lastLoadedThumbIndex = LR.images[0].index;

        if(LR.images.length < 2){
            return;
        }

        // Now that we have a thumbnail on the page, grab some measurements
        var _thumbOuterWidth = LR.images[0].$thumbnail.outerWidth();
        var _thumbOuterHeight = LR.images[0].$thumbnail.outerWidth();
        var _rowHeight = _$body.height() - _bodyHeight;
        var _availableWidth = $("#thumbnailContainer").width() - _scrollbarWidth;
        var _rowsToLoad = Math.floor((_$w.height() - _bodyHeight) / _rowHeight) + 1;
        var _thumbsPerRow = Math.ceil((_availableWidth + _scrollbarWidth) / _thumbOuterWidth);
        var _thumbsToLoad = _rowsToLoad * _thumbsPerRow;

        for(var i = 1; i < _thumbsToLoad; i++){

            if(LR.images[i] == undefined){
                break;
            }

            _$thumbnailsParent.append(LR.images[i].$thumbnail);
            LR.images[i].$thumbnail.on(
                "click",
                onThumbnailClick
            );
            LR.images[i].$thumbnailImg.attr(
                "src",
                "images/thumbnails/" + LR.images[i].exportFilename + ".jpg"
            );
            _$lastLoadedThumb = LR.images[i].$thumbnail;
            _lastLoadedThumbIndex = LR.images[i].index;
        }

        // un-simulate a scrollbar
        _$body.css("padding-right", 0);

        _$w.on(
            "scroll",
            onWindowLoadScroll
        );
    }

    function onWindowLoadScroll(e) {
        checkForSpace();
    }

    function onWindowScroll(e) {
        if(_$w.scrollTop() > 0 && !_$body.hasClass("scrolled")){
            _$body.addClass("scrolled");
        }
        else if(_$w.scrollTop() == 0 && _$body.hasClass("scrolled")) {
            _$body.removeClass("scrolled");
            if(_fixedHeader){
                _$thumbnailContainer.css("padding-top", _$header.outerHeight() + "px");
            }
        }
    }

    function onWindowResize(e) {
        _viewportHeight = _$w.height();
        _viewportWidth = _$w.width();
        if(_fixedHeader){
            _$thumbnailContainer.css("padding-top", _$header.outerHeight() + "px");
        }
        checkForSpace();
    }

    // We use this to determine how many images to load on scroll
    function getCurrentColumnCount() {
        var _y;
        var _columns = 1;
        var _currentThumbs = _$thumbnailsParent.find("div.thumbnail");
        if(_currentThumbs.length > 1){
            _y = $(_currentThumbs[0]).offset().top;
        }
        else {
            return _columns;
        }
        for(var i = 1; i < _currentThumbs.length; i++){
            var _top = $(_currentThumbs[i]).offset().top;
            if(_top != _y){
                return _columns;
            }
            else {
                _columns++;
            }
        }
        return _columns;
    }

    function checkForSpace(){

        var _extraItemsToLoad = 0;
        var _thumbWidth = _$lastLoadedThumb.outerWidth();
        var _lastThumbLeftOffset = _$lastLoadedThumb.offset().left;

        if(_lastThumbLeftOffset + _thumbWidth < _viewportWidth){
            _extraItemsToLoad = ((_viewportWidth - (_lastThumbLeftOffset + _thumbWidth)) / _thumbWidth);
            if(_extraItemsToLoad < 1){
                _extraItemsToLoad = 0;
            }
            else{
                _extraItemsToLoad = Math.round(_extraItemsToLoad);
            }
        }

        if((_$w.scrollTop() + _viewportHeight) == _$body.height() && _thumbsToLoad == 0 && _lastLoadedThumbIndex < LR.images.length - 1){
            loadMoreThumbnails(_lastLoadedThumbIndex + 1, (getCurrentColumnCount() * 2) + _extraItemsToLoad);
        }
        else if(_$body.height() < _viewportHeight && _thumbsToLoad == 0){
            loadMoreThumbnails(_lastLoadedThumbIndex + 1, (getCurrentColumnCount() * 2) + _extraItemsToLoad);
        }
        else if(_extraItemsToLoad > 0 && _thumbsToLoad == 0 && _lastLoadedThumbIndex < LR.images.length - 1){
            loadMoreThumbnails(_lastLoadedThumbIndex + 1, _extraItemsToLoad);
        }
    }

    function loadMoreThumbnails(startIndex, quantity) {
        _thumbsToLoad = quantity;
        for(var i = startIndex; i < startIndex + quantity; i++){
            if(LR.images[i] == undefined){
                break;
            }
            _$thumbnailsParent.append(LR.images[i].$thumbnail);
            LR.images[i].$thumbnail.on(
                "click",
                onThumbnailClick
            );
            LR.images[i].$thumbnailImg.attr(
                "src",
                "images/thumbnails/" + LR.images[i].exportFilename + ".jpg"
            );
            _$lastLoadedThumb = LR.images[i].$thumbnail;
            _lastLoadedThumbIndex = LR.images[i].index;
        }
    }

    function onThumbnailImgLoad(e) {
        var $el = $(e.currentTarget);
        $el.parent().css(
            {
                "background-image"      : "url('" + $el.attr("src") + "')",
                "background-size"       : "cover",
                "background-position"   : "center center"
            }
        );
        $el.css("display", "none");
        if(_thumbsToLoad > 0){
            _thumbsToLoad--;
        }
        else {
            checkForSpace();
        }
    }

    function onThumbnailImgError(e) {
        // we should inject an SVG or something here so that the thumbnanil grid doesn't become oddly sized
        if(_thumbsToLoad > 0){
            _thumbsToLoad--;
        }
        else {
            checkForSpace();
        }
    }

    function onThumbnailClick(e) {
        showLoupeViewForThumbnail($(e.currentTarget));
    }

    // Loupe View Logic

    _$loupeContainer.fadeOut(0);
    _$loupeImageContainer.fadeOut(0);
    _$loupeInfoContainer.fadeOut(0);
    _$buttonClose.fadeOut(0);
    _$loupeBackground.css("opacity", 0);
    _$buttonClose.on(
        "click",
        closeLoupeView
    );

    _$buttonPrev.on(
        "click",
        showPrevImage
    );

    _$buttonNext.on(
        "click",
        showNextImage
    );

    _$hotspotPrevLoupe.on(
        "mouseover",
        onHotspotPrevLoupeOver
    );

    _$hotspotPrevLoupe.on(
        "mouseout",
        onHotspotPrevLoupeOut
    );

    _$hotspotPrevLoupe.on(
        "click",
        showPrevImage
    );

    _$hotspotNextLoupe.on(
        "mouseover",
        onHotspotNextLoupeOver
    );

    _$hotspotNextLoupe.on(
        "mouseout",
        onHotspotNextLoupeOut
    );

    _$hotspotNextLoupe.on(
        "click",
        showNextImage
    );
    
    if(_autoViewThumb){
        showLoupeViewForThumbnail(_autoViewThumb, true);
    }

    function openLoupeView(snap) {
        _loupeIsTransitioning = true;
        setCounts();
        _$loupeContainer.fadeIn(0);
        _$loupeBackground.css(
            {
                "width": _$targetThumb.width() + "px",
                "height": _$targetThumb.height() + "px",
                "top": (_$targetThumb.offset().top - $(window).scrollTop()) + "px",
                "left": _$targetThumb.offset().left + "px"
            }
        );
        _$loupeContainer.css("display", "block");
        var _targetTime = 250;
        if(snap){
            _targetTime = 0;
        }
        _$loupeBackground.animate(
            {
                "width": "100%",
                "height": "100%",
                "top": "0px",
                "left": "0px",
                "opacity": 1
            },
            _targetTime,
            onLoupeBackgroundShown
        );
        $(document).on(
            "keydown",
            onLoupeKeyDown
        );
    }

    function onLoupeBackgroundShown() {
        _$body.addClass("loupe-active");
        showLoupeElements();
    }

    function showLoupeElements() {
        _$loupeInfoContainer.fadeIn(350);
        _$buttonClose.fadeIn(350);
        _isOpen = true;
        showLoupeViewForThumbnail(_$targetThumb);
    }

    function showLoupeViewForThumbnail($thumbnail, snap) {
        _loupeIsTransitioning = true;
        _$targetThumb = $thumbnail;
        _currentImageIndex = _$targetThumb.data("index");
        if(!_isOpen){
            openLoupeView(snap);
            return;
        }
        setLateralNavVisibilities();
        loadImageForThumbnail(_$targetThumb);
    }

    function setLateralNavVisibilities() {
        if(_currentImageIndex == 0){
            _$hotspotPrevLoupe.addClass("disabled");
            _$buttonPrev.addClass("disabled");
        }
        else{
            _$hotspotPrevLoupe.removeClass("disabled");
            _$buttonPrev.removeClass("disabled");
        }
        if(_currentImageIndex == LR.images.length - 1){
            _$hotspotNextLoupe.addClass("disabled");
            _$buttonNext.addClass("disabled");
        }
        else{
            _$hotspotNextLoupe.removeClass("disabled");
            _$buttonNext.removeClass("disabled");
        }
    }

    function loadImageForThumbnail($thumbnail) {
        _currentImageIndex = $thumbnail.data("index");
        $('<img/>').css("opacity", 0).attr('src', $thumbnail.attr("data-large-img")).load(
            function() {
                $(this).remove();
                setImage();
            }
        );
        var _metadata = "";
        if($thumbnail.attr("data-title") != "nil"){
            _metadata += '<p class="title">' + $thumbnail.attr("data-title") + '</p>';
        }
        if($thumbnail.attr("data-caption") != "nil"){
            _metadata += '<p class="caption">' + $thumbnail.attr("data-caption") + '</p>';
        }
        _$loupeMeta.html(_metadata);
        setLateralNavVisibilities();
    }

    function setImage() {
        if(_$loupeImage){
            _$loupeImage.remove();
        }
        _$loupeImage = $('<div class="image"></div>');
        _$loupeCorners = $('<div class="corners"></div>');
        _$loupeImg = $('<img src="' + _$targetThumb.attr("data-large-img") + '"/>');

        _$loupeCorners.append(_$loupeImg);
        _$loupeImage.append(_$loupeCorners);

        _$loupeImageContainer.fadeOut(0);

        _$loupeImageContainer.append(_$loupeImage);
        _$loupeImageContainer.fadeIn(350, onSetImageFadeInComplete);

        setLoupeHashForID(_$targetThumb.attr("data-id"));

        _$loupeImg.css("max-height", _$loupeContainer.height() + "px");

        $(window).on(
            "resize",
            onLoupeResize
        );
    }

    function onSetImageFadeInComplete() {
        _loupeIsTransitioning = false;
    }

    function setCounts() {
        _$countTotal.html(_$thumbnails.length);
        _$countCurrent.html(_$targetThumb.data("index") + 1);
    }

    function setLoupeHashForID(id) {
        window.location.hash = "#/view/" + id;
    }

    function hideCurrentImage() {
        _loupeIsTransitioning = true;
        _$loupeImageContainer.fadeOut(100, onCurrentImageHidden);
        $(window).off(
            "resize",
            onLoupeResize
        );
    }

    function onCurrentImageHidden() {
        loadImageForThumbnail(_$targetThumb);
    }

    function showNextImage() {
        if(_loupeIsTransitioning){
            return;
        }
        if(_currentImageIndex == _$thumbnails.length - 1){
            _$targetThumb = LR.images[0].$thumbnail;
        }
        else{
            _$targetThumb = LR.images[_currentImageIndex + 1].$thumbnail;
        }
        hideCurrentImage();
        setCounts();
    }

    function showPrevImage() {
        if(_loupeIsTransitioning){
            return;
        }
        if(_currentImageIndex == 0){
            _$targetThumb = LR.images[$_thumbnails.length - 1].$thumbnail;
        }
        else{
            _$targetThumb = LR.images[_currentImageIndex - 1].$thumbnail;
        }
        hideCurrentImage();
        setCounts();
    }

    function onHotspotPrevLoupeOver(e) {
        if(_currentImageIndex > 0){
            _$hotspotPrevLoupe.addClass("over");
        }
    }

    function onHotspotPrevLoupeOut(e) {
        _$hotspotPrevLoupe.removeClass("over");
    }

    function onHotspotNextLoupeOver(e) {
        if(_currentImageIndex < _$thumbnails.length - 1){
            _$hotspotNextLoupe.addClass("over");
        }
    }

    function onHotspotNextLoupeOut(e) {
        _$hotspotNextLoupe.removeClass("over");
    }

    function onLoupeKeyDown(e){
        switch(e.keyCode){
            case 39: 
                showNextImage();
                break;
            case 37: 
                showPrevImage();
                break;
        }
    }

    function onLoupeResize(e){
        _$loupeImg.css("max-height", _$loupeContainer.height() + "px");
    }

    function closeLoupeView(e) {
        e.preventDefault();
        e.stopPropagation();
        $(window).off(
            "resize",
            onLoupeResize
        );
        _$loupeImageContainer.fadeOut(0);
        _$loupeInfoContainer.fadeOut(0);
        _$buttonClose.fadeOut(0);
        _$loupeContainer.fadeOut(0);
        _$loupeImage.remove();
        $(document).off(
            "keydown",
            onLoupeKeyDown
        );
        unlockBody();
        var currentScrollTop = _$w.scrollTop();
        window.location.hash = "";
        _$w.scrollTop(currentScrollTop);
        _isOpen = false;
    }

    function unlockBody() {
        _$body.removeClass("loupe-active");
    }

    // Wire up the fullscreen stuff if we can
    if(Modernizr.fullscreen){
        $("#buttonFullscreen").on(
            "click",
            toggleFullScreen
        );
    }

    if(window.hostIsLightroom){
        $("#buttonFullscreen").css("display", "none");
    }

    _$w.trigger("resize");

    // This was taken from Mozilla's MDN reference: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode#Browser_compatibility
    // At author-time, this API is still very much in flux and not consistent between browsers, as shown by the conditionals below:

    function toggleFullScreen(e) {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

}

$(document).ready(function(){
    init();
});