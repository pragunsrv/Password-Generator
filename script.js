document.getElementById('generate-btn').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const password = generatePassword(length);
    document.getElementById('password-display').textContent = password;
});

function generatePassword(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
