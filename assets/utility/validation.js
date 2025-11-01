function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

function validateNickname(nickname) {
  return nickname.length >= 2;
}

