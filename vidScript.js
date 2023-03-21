/* randomize cursor to dude pic*/
function setCursor() {
    const gangsAllHere = [ 
        'alex.png', 
        'amir.png', 
        'beardo.png', 
        'jake.png',
        'jeff.png',
        'juicy.png',
    ];

    var i = Math.floor(Math.random() * gangsAllHere.length);
    document.documentElement.style.setProperty('--cursor-url', "url(assets/" + gangsAllHere[i] + ")");
}

setCursor();