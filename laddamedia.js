// Define a function to handle the select change event
function handleMediaChange() {
    var selectedValue = this.value;
    var selectElement = this;

    // Remove any existing media elements
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

// Function to handle file selection and display the selected media
function handleFileSelect(event) {
    var file = event.target.files[0];
    if (!file) return;

    // Remove any existing media elements before displaying the new one
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

// Function to remove all media elements (iframe, video, audio, img)
function removeMedia() {
    // Select all iframe, video, audio, and img elements
    var mediaElements = document.querySelectorAll('iframe, video, audio, img');
    
    // Iterate over each media element and remove it
    mediaElements.forEach(function(element) {
        element.remove();
    });
}

// Add event listener to the select element
document.querySelector('select[name="media"]').addEventListener('change', handleMediaChange);

// Trigger the event listener function on page load
document.addEventListener('DOMContentLoaded', function() {
    // Call the handleMediaChange function directly to ensure the input is shown if 'Länk' is the default option
    handleMediaChange.call(document.querySelector('select[name="media"]'));
});

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('input', function(event) {
        if (event.target && event.target.name === 'media_link') {
            var value = event.target.value.trim();
            var media;

            if (value.includes('youtube.com') || value.includes('youtu.be')) {
                // If it's a YouTube link
                var videoId = getYouTubeVideoId(value);
                if (videoId) {
                    createEmbed('https://www.youtube.com/embed/' + videoId);
                    return; // Exit the function after creating the embed
                }
            } else if (value.includes('open.spotify.com')) {
                // If it's a Spotify link
                createEmbed(value.replace('open.spotify.com', 'embed.spotify.com'));
                return; // Exit the function after creating the embed
            } else {
                // If it's none of the supported platforms, show an alert message
                alert("Ogiltig media länk. Vänligen använd en länk från YouTube eller Spotify");
                return;
            }
        }
    });
});

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(regExp);
    return match && match[1]; // Return the video ID if match is found
}

// Function to create embed element and replace input field
function createEmbed(embedSrc) {
    removeMedia();
    var embedElement = document.createElement('iframe');
    embedElement.setAttribute('src', embedSrc);
    embedElement.setAttribute('frameborder', 'no');
    embedElement.setAttribute('scrolling', 'no');
    embedElement.setAttribute('allow', 'autoplay; fullscreen');
    embedElement.setAttribute('allowfullscreen', 'true');

    var inputField = document.querySelector('input[name="media_link"]');
    inputField.insertAdjacentElement('afterend', embedElement); // Insert the iframe after the input field
}