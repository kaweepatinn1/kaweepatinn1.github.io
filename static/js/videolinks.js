// Add new links to the bottom of the links list in staticLinkedVideo()
// linkedVideo() should refer to indexes of staticLinkedVideo
// where 1 is the first element.

function linkedVideo(video){
    const references = [];
    if ( document.getElementById("pageIsIndex") != undefined ){       
        references.push( // INDEX PAGE LINKS
            2, // 2. Concept Apple Ad
            3, // 3. OYYGC Animated MV
            4, // 4. Three Years of Animating
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsAbout") != undefined ){
        references.push( // ABOUT PAGE LINKS
            1, // 1. Null Link
            1, // 1. Null Link
            1, // 1. Null Link
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsAdvertising") != undefined ){
        references.push( // ADVERTISING PAGE LINKS
            2, // 2. Concept Apple Ad
            4, // 4. LiveHK
            6, // 6. Veggie Quest
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsAnimation") != undefined ){
        references.push( // ADVERTISING PAGE LINKS
            3, // 3. OYYGC Animated MV
            2, // 2. Concept Apple Ad
            1, // 1. Null Link
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsFilm") != undefined ){
        references.push( // FILM PAGE LINKS
            7, // 7. Rerunner Chase Scene
            1, // 1. Null Link
            1, // 1. Null Link
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsOther") != undefined ){
        references.push( // OTHER PAGE LINKS
            8, // 8. Star Persona Video Essay
            9, // 9. HK Documentary
            1, // 1. Null Link
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsPhotography") != undefined ){
        references.push( // PHOTOGRAPHY PAGE LINKS
            1, // 1. Null Link
            1, // 1. Null Link
            1, // 1. Null Link
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else {
        console("ERROR: NO LINK REFERENCES");
        staticLinkedVideo(-1);
    }
}

function staticLinkedVideo(video){
    const links = [];
    links.push(
        "index.html",                   // 1. Null Link
        "https://youtu.be/TJcj5AYzPAI", // 2. Concept Apple Ad
        "https://youtu.be/bEeUHc6P1r4", // 3. OYYGC Animated MV
        "https://youtu.be/IKzMFwDjH6M", // 4. LiveHK
        "https://youtu.be/hTNcdBrw8AM", // 5. Three Years of Animating
        "https://youtu.be/xaU7hLWyIRs", // 6. Veggie Quest
        "https://youtu.be/AnKIrmk5WU8", // 7. Rerunner Chase Scene
        "https://youtu.be/N9OdA1MlEvY", // 8. Star Persona Video Essay
        "https://youtu.be/B_J5w6NZO6c", // 9. HK Documentary
        );
    if (video != -1){
        window.open(links[video-1]);
    } else {
        window.open("404.html");
    }
}

//window.open('https://youtu.be/TJcj5AYzPAI')