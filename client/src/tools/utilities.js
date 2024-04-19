/**
 * Validates and sanitizes input data.
 * @param {string} input - The user input to validate and sanitize.
 * @returns {string | null} - Sanitized input if valid, null otherwise.
 */
function validateAndSanitizeInput(input) {
    if (typeof input !== 'string') {
        return null; // Input is not valid if it's not a string
    }

    // Trim input to remove leading and trailing spaces
    input = input.trim();

    // Sanitize input to escape HTML characters
    input = escapeHTML(input);

    // Example of additional validation
    // You can check for length, regex patterns, etc.
    if (!input || input.length < 1 || input.length > 100) {
        return null; // Not valid if empty, too short, or too long
    }
    console.log("VALIDATION&SANITIZATION IS SUCCESSFUL!")
    return input;
}

/**
 * Validates a password input.
 * @param {string} password - The password input to validate.
 * @returns {string | null} - The trimmed password if valid, null otherwise.
 */
function validatePassword(password) {
    if (typeof password !== 'string') {
        return null; // Password is not valid if it's not a string
    }

    // Trim password to remove leading and trailing spaces (spaces inside are allowed)
    password = password.trim();

    // Check for minimum and maximum length requirements
    if (password.length < 8 || password.length > 50) {
        return null; // Not valid if too short or too long
    }

    // Example of additional complexity checks
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
        return null; // Password does not meet complexity requirements
    }

    return password; // Return the valid password
}

/**
 * Escapes HTML characters in a string.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            default: return match;
        }
    });
}

module.exports = {
    validateAndSanitizeInput,
    validatePassword
};