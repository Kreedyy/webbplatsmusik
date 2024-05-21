document.addEventListener('DOMContentLoaded', function() {
    var passwordInput = document.querySelector('input[name="lösenord"]');
    document.querySelector('input[name="visa"]').addEventListener('change', function() {
        if (this.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });
});