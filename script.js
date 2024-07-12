document.getElementById('generate-btn').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSpecial = document.getElementById('special').checked;
    const password = generatePassword(length, useUppercase, useLowercase, useNumbers, useSpecial);
    document.getElementById('password-display').textContent = password;
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const password = document.getElementById('password-display').textContent;
    navigator.clipboard.writeText(password).then(function() {
        alert('Password copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
});

function generatePassword(length, useUppercase, useLowercase, useNumbers, useSpecial) {
    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
    const numberCharset = '0123456789';
    const specialCharset = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let charset = '';
    if (useUppercase) charset += uppercaseCharset;
    if (useLowercase) charset += lowercaseCharset;
    if (useNumbers) charset += numberCharset;
    if (useSpecial) charset += specialCharset;
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
