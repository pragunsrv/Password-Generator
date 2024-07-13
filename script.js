document.getElementById('generate-btn').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const uppercaseCount = document.getElementById('uppercase-count').value;
    const lowercaseCount = document.getElementById('lowercase-count').value;
    const numbersCount = document.getElementById('numbers-count').value;
    const specialCount = document.getElementById('special-count').value;
    const excludeChars = document.getElementById('exclude-chars').value;
    const password = generatePassword(length, uppercaseCount, lowercaseCount, numbersCount, specialCount, excludeChars);
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

function generatePassword(length, uppercaseCount, lowercaseCount, numbersCount, specialCount, excludeChars) {
    const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
    const numberCharset = '0123456789';
    const specialCharset = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let charset = '';
    charset += filterCharacters(uppercaseCharset, excludeChars);
    charset += filterCharacters(lowercaseCharset, excludeChars);
    charset += filterCharacters(numberCharset, excludeChars);
    charset += filterCharacters(specialCharset, excludeChars);

    let password = '';
    password += getRandomCharacters(filterCharacters(uppercaseCharset, excludeChars), uppercaseCount);
    password += getRandomCharacters(filterCharacters(lowercaseCharset, excludeChars), lowercaseCount);
    password += getRandomCharacters(filterCharacters(numberCharset, excludeChars), numbersCount);
    password += getRandomCharacters(filterCharacters(specialCharset, excludeChars), specialCount);

    if (password.length < length) {
        const remainingLength = length - password.length;
        password += getRandomCharacters(charset, remainingLength);
    }

    return shuffleString(password);
}

function filterCharacters(charset, excludeChars) {
    return charset.split('').filter(char => !excludeChars.includes(char)).join('');
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
