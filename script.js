document.addEventListener("DOMContentLoaded", function() {
    var passwordInput = document.getElementById("password");
    var strengthBar = document.querySelector(".strength-bar");

    // Hide the strength bar initially
    strengthBar.style.visibility = "hidden";

    // Check password strength when Enter key is pressed
    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkPassword();
            updateStrengthBar(passwordInput.value);
            strengthBar.style.visibility = "visible"; // Show the strength bar
        }
    });
    passwordInput.addEventListener("input", function(event) {
        if (passwordInput.value === "") {
            resetStrength();
        }
    });
});
function resetStrength() {
    var resultElement = document.getElementById("result");
    var strengthBar = document.querySelector(".strength-bar");
    var bar = document.querySelector(".bar");

    // Reset strength statement and color
    resultElement.textContent = "";
    resultElement.style.color = "white";

    // Reset strength bar and color
    bar.style.width = "0%";
    bar.style.backgroundColor = "white";
    strengthBar.style.backgroundColor = "white";
}

function checkPassword() {
    var password = document.getElementById("password").value;
    var resultElement = document.getElementById("result");
    var strengthBar = document.querySelector(".strength-bar");
    var bar = document.querySelector(".bar");

    // Define criteria for weak, medium, and strong passwords
    var weakRegex = new RegExp("^.{1,7}$");
    var mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})");

    if (strongRegex.test(password)) {
        resultElement.textContent = "Strong password!";
        resultElement.style.color = "green"; // Set color to green
        bar.style.backgroundColor = "green";
        strengthBar.style.backgroundColor = "green"; // Set color of strength bar
    } else if (mediumRegex.test(password)) {
        resultElement.textContent = "Medium password";
        resultElement.style.color = "yellow"; // Set color to yellow
        bar.style.backgroundColor = "yellow";
        strengthBar.style.backgroundColor = "yellow"; // Set color of strength bar
    } else if (weakRegex.test(password)) {
        resultElement.textContent = "Weak password";
        resultElement.style.color = "red"; // Set color to red
        bar.style.backgroundColor = "red"; 
        strengthBar.style.backgroundColor = "red"; // Set color of strength bar
    } else {
        resultElement.textContent = "Password does not meet minimum requirements.";
        resultElement.style.color = "white"; // Set color to white
        bar.style.backgroundColor = "white"; 
        strengthBar.style.backgroundColor = "white"; // Set color of strength bar
    }
}
function updateStrengthBar(password) {
    var bar = document.querySelector(".bar");
    var strength = calculateStrength(password);

    // Adjust the width of the bar based on strength
    bar.style.width = strength + "%";

    // Change the color based on strength
    if (strength < 33) {
        bar.style.backgroundColor = "red"; // Weak
    } else if (strength < 66) {
        bar.style.backgroundColor = "yellow"; // Medium
    } else {
        bar.style.backgroundColor = "green"; // Strong
    }
}
function calculateStrength(password) {
    // Calculate password strength here (e.g., based on length or complexity)
    // For simplicity, let's use the presence of at least one lowercase letter,
    // one uppercase letter, one digit, and one special character to determine strong strength
    var containsLowercase = /[a-z]/.test(password);
    var containsUppercase = /[A-Z]/.test(password);
    var containsDigit = /\d/.test(password);
    var containsSpecialChar = /[!@#$%^&*]/.test(password);

    // Determine the strength percentage based on the presence of required characters
    var strength = ((containsLowercase && containsUppercase && containsDigit && containsSpecialChar) ? 100 : 0);
    return strength;
}
function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
