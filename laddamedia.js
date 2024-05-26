// Funktion för att hantera förändringar i select-elementet för media
function handleMediaChange() {
    var selectedValue = this.value;
    var selectElement = this;

    // Ta bort eventuella befintliga mediaelement
    removeMedia();

    var siblingInputs = Array.from(selectElement.parentNode.children).filter(function(child) {
        return child.tagName.toLowerCase() === 'input' && 
               (child.getAttribute('name') === 'media_link' || 
                child.getAttribute('name') === 'video_media' ||
                child.getAttribute('name') === 'img_media');
    });

    if (selectedValue === 'länk' && siblingInputs.length === 0) {
        siblingInputs.forEach(function(input) {
            input.remove();
        });
        var linkInput = document.createElement('input');
        linkInput.setAttribute('type', 'text');
        linkInput.setAttribute('name', 'media_link');
        linkInput.setAttribute('placeholder', 'Skriv in länken här...');
        selectElement.parentNode.appendChild(linkInput);
    } else if (selectedValue === 'video/ljud' && siblingInputs.length === 0) {
        var fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('name', 'video_media');
        fileInput.setAttribute('accept', 'video/mp4, video/quicktime, video/webm, audio/mpeg, audio/ogg');
        selectElement.parentNode.appendChild(fileInput);
        fileInput.addEventListener('change', handleFileSelect);
    } else if (selectedValue === 'bild' && siblingInputs.length === 0) {
        var imgInput = document.createElement('input');
        imgInput.setAttribute('type', 'file');
        imgInput.setAttribute('name', 'img_media');
        imgInput.setAttribute('accept', 'image/jpeg, image/png, image/gif');
        selectElement.parentNode.appendChild(imgInput);
        imgInput.addEventListener('change', handleFileSelect);
    } else if (selectedValue !== 'länk' && siblingInputs.length > 0) {
        siblingInputs.forEach(function(input) {
            input.remove();
        });
        if (selectedValue === 'video/ljud') {
            var fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('name', 'video_media');
            fileInput.setAttribute('accept', 'video/mp4, video/quicktime, video/webm, audio/mpeg, audio/ogg');
            selectElement.parentNode.appendChild(fileInput);
            fileInput.addEventListener('change', handleFileSelect);
        } else if (selectedValue === 'bild') {
            var imgInput = document.createElement('input');
            imgInput.setAttribute('type', 'file');
            imgInput.setAttribute('name', 'img_media');
            imgInput.setAttribute('accept', 'image/jpeg, image/png, image/gif');
            selectElement.parentNode.appendChild(imgInput);
            imgInput.addEventListener('change', handleFileSelect);
        }
    }
}

// Funktion för att hantera filval och visa det valda mediet
function handleFileSelect(event) {
    var file = event.target.files[0];
    if (!file) return;

    // Ta bort eventuella befintliga mediaelement innan det nya visas
    removeMedia();

    var mediaElement;
    if (file.type.startsWith('image/')) {
        mediaElement = document.createElement('img');
        mediaElement.setAttribute('src', URL.createObjectURL(file));
    } else if (file.type.startsWith('video/')) {
        mediaElement = document.createElement('video');
        mediaElement.setAttribute('controls', 'controls');
        mediaElement.setAttribute('src', URL.createObjectURL(file));
    } else if (file.type.startsWith('audio/')) {
        mediaElement = document.createElement('audio');
        mediaElement.setAttribute('controls', 'controls');
        mediaElement.setAttribute('src', URL.createObjectURL(file));
    }

    if (mediaElement) {
        event.target.insertAdjacentElement('afterend', mediaElement);
    }
}

// Funktion för att ta bort alla mediaelement (iframe, video, audio, img)
function removeMedia() {
    // Välj alla iframe, video, audio och img element
    var mediaElements = document.querySelectorAll('iframe, video, audio, img');
    
    // Iterera över varje mediaelement och ta bort det
    mediaElements.forEach(function(element) {
        element.remove();
    });
}

// Lägg till händelselyssnare till select-elementet
document.querySelector('select[name="media"]').addEventListener('change', handleMediaChange);

// Kör händelselyssnarefunktionen när sidan laddas
document.addEventListener('DOMContentLoaded', function() {
    // Anropa handleMediaChange-funktionen direkt för att säkerställa att input visas om 'Länk' är standardalternativet
    handleMediaChange.call(document.querySelector('select[name="media"]'));
});

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('input', function(event) {
        if (event.target && event.target.name === 'media_link') {
            var value = event.target.value.trim();
            var media;

            if (value.includes('youtube.com') || value.includes('youtu.be')) {
                // Om det är en YouTube-länk
                var videoId = getYouTubeVideoId(value);
                if (videoId) {
                    createEmbed('https://www.youtube.com/embed/' + videoId);
                    return; // Avsluta funktionen efter att ha skapat inbäddningen
                }
            } else if (value.includes('open.spotify.com')) {
                // Om det är en Spotify-länk
                createEmbed(value.replace('open.spotify.com', 'embed.spotify.com'));
                return; // Avsluta funktionen efter att ha skapat inbäddningen
            } else {
                // Om det inte är någon av de stödda plattformarna, visa ett varningsmeddelande
                alert("Ogiltig media länk. Vänligen använd en länk från YouTube eller Spotify");
                return;
            }
        }
    });
});

// Funktion för att extrahera YouTube-video-ID från URL
function getYouTubeVideoId(url) {
    var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regExp);
    return match && match[1]; // Returnera video-ID om matchning hittas
}

// Funktion för att skapa inbäddningselement och ersätta input-fältet
function createEmbed(embedSrc) {
    removeMedia();
    var embedElement = document.createElement('iframe');
    embedElement.setAttribute('src', embedSrc);
    embedElement.setAttribute('frameborder', 'no');
    embedElement.setAttribute('scrolling', 'no');
    embedElement.setAttribute('allow', 'autoplay; fullscreen');
    embedElement.setAttribute('allowfullscreen', 'true');

    var inputField = document.querySelector('input[name="media_link"]');
    inputField.insertAdjacentElement('afterend', embedElement); // Infoga iframen efter input
}