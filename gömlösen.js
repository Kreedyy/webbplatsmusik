// Lyssnar på händelsen "DOMContentLoaded" för att köra koden när hela HTML-dokumentet har laddats.
document.addEventListener('DOMContentLoaded', function() {
    // Hämtar referensen till input-elementet för lösenord.
    var passwordInput = document.querySelector('input[name="lösenord"]');
    
    // Lägger till en händelselyssnare på checkbox-elementet för att övervaka ändringar i dess status.
    document.querySelector('input[name="visa"]').addEventListener('change', function() {
        // Om rutan är markerad, ändrar typen av lösenordsinmatningen till "text" (synligt lösenord).
        if (this.checked) {
            passwordInput.type = 'text';
        } 
        // Annars, om rutan inte är markerad, ändrar typen av lösenordsinmatningen till "password" (dolt lösenord).
        else {
            passwordInput.type = 'password';
        }
    });
});