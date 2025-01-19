document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".signin-form");
    const emailInput = loginForm.querySelector("input[placeholder='Username']");
    const passwordInput = loginForm.querySelector("#password-field");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            alert(`Welcome back, ${user.firstName}!`);
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
