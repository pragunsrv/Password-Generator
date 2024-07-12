document.getElementById('generate-btn').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const uppercaseCount = document.getElementById('uppercase-count').value;
    const lowercaseCount = document.getElementById('lowercase-count').value;
    const numbersCount = document.getElementById('numbers-count').value;
    const specialCount = document.getElementById('special-count').value;
    const password = generatePassword(length, uppercaseCount, lowercaseCount, numbersCount, specialCount);
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

function generatePassword(length, uppercaseCount, lowercaseCount, numbersCount, specialCount) {
    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
    const numberCharset = '0123456789';
    const specialCharset = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let password = '';
    password += getRandomCharacters(uppercaseCharset, uppercaseCount);
    password += getRandomCharacters(lowercaseCharset, lowercaseCount);
    password += getRandomCharacters(numberCharset, numbersCount);
    password += getRandomCharacters(specialCharset, specialCount);
    
    if (password.length < length) {
        const remainingLength = length - password.length;
        const allCharsets = uppercaseCharset + lowercaseCharset + numberCharset + specialCharset;
        password += getRandomCharacters(allCharsets, remainingLength);
    }
    
    return shuffleString(password);
}

function getRandomCharacters(charset, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}

function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
