// Add new links to the bottom of the links list in staticLinkedVidenko()
// linkedVideo() should refer to indexes of staticLinkedVideo
// where 1 is the first element.

// New features: can return a String if type is 2 (returns src of video)
// or if type is 3 (returns src of poster)

function linkedVideo(video, type){
    const references = [];
    reference = -1;
    if ( document.getElementById("pageIsIndex") != undefined ){       
        references.push( // INDEX PAGE MEDIA AND LINKS
            2, // 2. Concept Apple Ad
            3, // 3. OYYGC Animated MV
            4, // 4. Three Years of Animating
        );
        reference = references[video-1]
    } else if ( document.getElementById("pageIsAbout") != undefined ){
        references.push( // ABOUT PAGE MEDIA AND LINKS
            1, // 1. Placeholder
            1, // 1. Placeholder
            1, // 1. Placeholder
        );
        reference = references[video-1]
    } else if ( document.getElementById("pageIsAdvertising") != undefined ){
        references.push( // ADVERTISING PAGE MEDIA AND LINKS
            2, // 2. Concept Apple Ad
            4, // 4. LiveHK
            6, // 6. Veggie Quest
        );
        reference = references[video-1]
    } else if ( document.getElementById("pageIsAnimation") != undefined ){
        references.push( // ADVERTISING PAGE MEDIA AND LINKS
            3, // 3. OYYGC Animated MV
            2, // 2. Concept Apple Ad
            1, // 1. Placeholder
        );
        reference = references[video-1]
    } else if ( document.getElementById("pageIsFilm") != undefined ){
        references.push( // FILM PAGE MEDIA AND LINKS
            7, // 7. Rerunner Chase Scene
            1, // 1. Placeholder
            1, // 1. Placeholder
        );
        reference = references[video-1]
    } else if ( document.getElementById("pageIsOther") != undefined ){
        references.push( // OTHER PAGE MEDIA AND LINKS
            8, // 8. Star Persona Video Essay
            9, // 9. HK Documentary
            1, // 1. Placeholder
        );
        reference = references[video-1]
        staticLinkedVideo(reference);
    } else if ( document.getElementById("pageIsPhotography") != undefined ){
        references.push( // PHOTOGRAPHY PAGE MEDIA AND LINKS
            1, // 1. Placeholder
            1, // 1. Placeholder
            1, // 1. Placeholder
        );
        reference = references[video-1]
    } else {
        console("ERROR: NO LINK REFERENCES FOR TYPE " + type);
        reference = -1;
    }
    if (type == undefined){
        staticLinkedVideo(reference);
    } else if (type == 2){
        return staticEmbed(reference, true);
    } else if (type == 3){
        return staticEmbed(reference, false);
    }
}

function staticLinkedVideo(video){
    const links = [];
    links.push(
        "index.html",                   // 1. Placeholder Link
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

// Linked embeds below

function staticEmbed(videoIndex, isVideo){
    const videoEmbeds = [];
    if (isVideo){
        videoEmbeds.push(
            "../static/assets/Placeholder.mp4",              // 1. Placeholder Item
            "../static/assets/AppleAd.mp4",                  // 2. Concept Apple Ad
            "../static/assets/OYYGC.mp4",                    // 3. OYYGC Animated MV
            "../static/assets/LiveHK.mp4",                   // 4. LiveHK
            "No Embed",                                     // 5. Three Years of Animating
            "../static/assets/VeggieQuest.mp4",              // 6. Veggie Quest
            "../static/assets/Rerunner.mp4",                 // 7. Rerunner Chase Scene
            "../static/assets/StarPersonaVideoEssay.mp4",    // 8. Star Persona Video Essay
            "../static/assets/TheSecondSet.mp4",             // 9. HK Documentary
            );
        return(videoEmbeds[videoIndex-1]);
    } else{
        videoEmbeds.push(
            "../static/assets/Placeholder.webp",              // 1. Placeholder Item
            "../static/assets/AppleAd.webp",                  // 2. Concept Apple Ad
            "../static/assets/OYYGC.webp",                    // 3. OYYGC Animated MV
            "../static/assets/LiveHK.webp",                   // 4. LiveHK
            "No Embed",                                      // 5. Three Years of Animating
            "../static/assets/VeggieQuest.webp",              // 6. Veggie Quest
            "../static/assets/Rerunner.webp",                 // 7. Rerunner Chase Scene
            "../static/assets/StarPersonaVideoEssay.webp",    // 8. Star Persona Video Essay
            "../static/assets/TheSecondSet.webp",             // 9. HK Documentary
            );
        return(videoEmbeds[videoIndex-1]);
    }
}

function loadLinks(){
    var totalplus1 = 1;
    stop = false;
    while(stop == false){ //counts the amount of elements with the tag and ID
        var check = document.getElementById("$" + totalplus1);
        if (check != undefined){
            totalplus1++
        } else{
            stop = true;
        }
    }
    for (let i = 1; i < totalplus1 ; i++){
        toChange = "#\\$" + i;
        $(toChange).attr('src', linkedVideo(i, 2));
        $(toChange).attr('poster', linkedVideo(i, 3));
    }
}

// loads all the links on the page on call (must be at the end of the body)
loadLinks();
