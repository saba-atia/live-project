document.addEventListener("DOMContentLoaded", () => {
    const signupbtn = document.getElementById("signup");

    const firstinput = document.getElementById("fname");
    const firsterror = document.getElementById("fnameerr");
    const secinput = document.getElementById("sname");
    const secerror = document.getElementById("snameerr");
    const emailinput = document.getElementById("email");
    const emailerror = document.getElementById("emailerr");
    const passinput = document.getElementById("password");
    const passerror = document.getElementById("passerr");
    const cpassinput = document.getElementById("cpass");
    const cpasserror = document.getElementById("cpasserr");

    const clearError = (input, error) => {
        input.addEventListener("input", () => {
            error.textContent = "";
        });
    };
    clearError(firstinput, firsterror);
    clearError(secinput, secerror);
    clearError(emailinput, emailerror);
    clearError(passinput, passerror);
    clearError(cpassinput, cpasserror);

    signupbtn.addEventListener("click", (event) => {
        event.preventDefault();

        const email = emailinput.value.trim();
        const password = passinput.value.trim();
        const firstName = firstinput.value.trim();
        const lastName = secinput.value.trim();
        const confirmPassword = cpassinput.value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const nameRegex = /^[a-zA-Z]+$/;

        let isValid = true;

        if (!emailRegex.test(email)) {
            emailerror.textContent = "Invalid email address";
            isValid = false;
        }

        if (!nameRegex.test(firstName)) {
            firsterror.textContent = "Invalid first name";
            isValid = false;
        }

        if (!nameRegex.test(lastName)) {
            secerror.textContent = "Invalid last name";
            isValid = false;
        }

        if (!passwordRegex.test(password)) {
            passerror.textContent = "Password must be at least 8 characters and contain a number and a special character";
            isValid = false;
        }

        if (password !== confirmPassword) {
            cpasserror.textContent = "Passwords do not match";
            isValid = false;
        }

        if (isValid) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push({ email, password, firstName, lastName });
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "login.html";
        }
    });
});
