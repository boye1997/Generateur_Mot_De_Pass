const generateButton = document.getElementById('generate');
const lengthInput = document.getElementById('length');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const passwordField = document.getElementById('password');
const tooltip = document.getElementById('tooltip');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numbersChars = '0123456789';
const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

function generatePassword() {
    const length = parseInt(lengthInput.value, 10);
    let charSet = '';
    if (document.getElementById('uppercase').checked) charSet += uppercaseChars;
    if (document.getElementById('lowercase').checked) charSet += lowercaseChars;
    if (document.getElementById('numbers').checked) charSet += numbersChars;
    if (document.getElementById('special').checked) charSet += specialChars;

    if (charSet === '') return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }
    return password;
}

function updateGenerateButton() {
    generateButton.disabled = !Array.from(checkboxes).some(checkbox => checkbox.checked);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateGenerateButton);
});

generateButton.addEventListener('click', () => {
    const password = generatePassword();
    passwordField.value = password;
});

passwordField.addEventListener('mouseover', () => {
    tooltip.style.visibility = 'visible';
});

passwordField.addEventListener('mouseout', () => {
    tooltip.style.visibility = 'hidden';
});

passwordField.addEventListener('click', () => {
    if (passwordField.value) {
        navigator.clipboard.writeText(passwordField.value).then(() => {
            tooltip.textContent = 'Copied!';
            setTimeout(() => {
                tooltip.textContent = 'Copy';
            }, 2000);
        });
    }
});

updateGenerateButton();
