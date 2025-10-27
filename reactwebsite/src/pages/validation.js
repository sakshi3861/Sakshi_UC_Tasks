export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//[a-z A-Z 0-9 _ /-/.]

export const validatePassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

export const validateUsername = (username) =>
  /^[a-z A-Z 0-9_]{3,15}$/.test(username);
