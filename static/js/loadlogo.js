function loadLogo(){
    
    // NEW FUNCTIONALITY: Also decides whether or not to disable the svg arrow.

    if ( document.getElementById("pageIsIndex") != undefined ){
        $("#downArrow1").attr('stroke-width', "0");
        loadNavIndexButton();
    } else if ( document.getElementById("pageIsAbout") != undefined ){
        $("#downArrow1").attr('stroke-width', "0");
        loadNavAboutButton();
    } else if ( document.getElementById("pageIsAdvertising") != undefined ){
        loadNavAdvertisingButton();
    } else if ( document.getElementById("pageIsAnimation") != undefined ){
        loadNavAnimationButton();
    } else if ( document.getElementById("pageIsFilm") != undefined ){
        loadNavFilmButton();
    } else if ( document.getElementById("pageIsOther") != undefined ){
        loadNavOtherButton();
    } else if ( document.getElementById("pageIsPhotography") != undefined ){
        $("#downArrow1").attr('stroke-width', "0");
        loadNavPhotographyButton();
    } else if ( document.getElementById("pageIsGallery") != undefined ){
        
    } else {
        console.log("ERROR: NO LOGO SELECTOR ELEMENT");
        loadNavEmpty();
    }
}