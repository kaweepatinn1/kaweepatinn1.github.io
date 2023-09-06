function loadLogo(){
    
    if ( document.getElementById("pageIsIndex") != undefined ){
        loadNavIndexButton();
    } else if ( document.getElementById("pageIsAbout") != undefined ){
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
        loadNavPhotographyButton();
    } else {
        console("ERROR: NO LOGO SELECTOR ELEMENT");
        loadNavEmpty();
    }
    
    
}
