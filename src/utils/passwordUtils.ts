export function passwordStrengthIndex(password?: string): number {
  if (!password) return 0;

  let score = 0;

  // Password length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Contains numbers
  if (/\d/.test(password)) score++;

  // Contains special signs and capital letters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password) && /[A-Z]/.test(password))
    score++;

  // Normalize score
  return Math.max(1, Math.min(score, 4));
}
